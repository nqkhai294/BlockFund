// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool isActive;
        uint256 totalProfit;
        uint256 lastProfitReport;
        uint256 profitDistributionPeriod;
        mapping(address => uint256) lastProfitClaim;
    }

    struct CampaignHistory {
        uint256 campaignId;
        string action; // "created", "deleted", "expired", "completed", "profit_reported", "profit_claimed"
        address actor; // người thực hiện hành động
        uint256 timestamp;
        string description;
        uint256 amount; // số tiền liên quan (nếu có)
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => CampaignHistory[]) public campaignHistories;
    uint256 public numberOfCampaigns = 0;
    uint256 public totalHistoryEntries = 0;

    event CampaignCreated(uint256 indexed campaignId, address indexed owner, uint256 target, uint256 deadline);
    event DonationReceived(uint256 indexed campaignId, address indexed donator, uint256 amount);
    event ProfitReported(uint256 indexed campaignId, uint256 amount, uint256 timestamp);
    event ProfitClaimed(uint256 indexed campaignId, address indexed donator, uint256 amount, uint256 timestamp);
    event CampaignDeleted(uint256 indexed campaignId, address indexed owner, uint256 timestamp);
    event CampaignExpired(uint256 indexed campaignId, uint256 timestamp);
    event HistoryAdded(uint256 indexed campaignId, string action, address indexed actor, uint256 timestamp);

    // Hàm helper để thêm lịch sử
    function _addHistory(
        uint256 _campaignId,
        string memory _action,
        address _actor,
        string memory _description,
        uint256 _amount
    ) internal {
        CampaignHistory memory history = CampaignHistory({
            campaignId: _campaignId,
            action: _action,
            actor: _actor,
            timestamp: block.timestamp,
            description: _description,
            amount: _amount
        });
        
        campaignHistories[_campaignId].push(history);
        totalHistoryEntries++;
        
        emit HistoryAdded(_campaignId, _action, _actor, block.timestamp);
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image,
        uint256 _profitDistributionPeriod
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        require(_profitDistributionPeriod >= 1 days, "Profit distribution period must be at least 1 day");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.isActive = true;
        campaign.totalProfit = 0;
        campaign.lastProfitReport = block.timestamp;
        campaign.profitDistributionPeriod = _profitDistributionPeriod;

        uint256 campaignId = numberOfCampaigns;
        numberOfCampaigns++;

        _addHistory(
            campaignId,
            "created",
            _owner,
            string(abi.encodePacked("Campaign created with target ", _target, " ETH")),
            0
        );

        emit CampaignCreated(campaignId, _owner, _target, _deadline);
        return campaignId;
    }

    function deleteCampaign(uint256 _id) public {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        
        require(campaign.owner == msg.sender, "Only campaign owner can delete");
        require(campaign.isActive, "Campaign is already deleted");
        
        bool canDelete = false;
        string memory reason = "";
        
        if (campaign.amountCollected == 0) {
            canDelete = true;
            reason = "Campaign has no donations";
        }
        else if (block.timestamp >= campaign.deadline) {
            canDelete = true;
            reason = "Campaign has expired";
        }
        else if (campaign.amountCollected >= campaign.target) {
            canDelete = true;
            reason = "Campaign has reached its target";
        }
        
        require(canDelete, "Campaign cannot be deleted");
        
        campaign.isActive = false;
        
        _addHistory(
            _id,
            "deleted",
            msg.sender,
            reason,
            0
        );

        emit CampaignDeleted(_id, campaign.owner, block.timestamp);
    }

    function checkCampaignStatus(uint256 _id) public view returns (
        bool isActive,
        bool isExpired,
        bool isCompleted,
        bool canBeDeleted,
        string memory status
    ) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        
        isActive = campaign.isActive;
        isExpired = block.timestamp >= campaign.deadline;
        isCompleted = campaign.amountCollected >= campaign.target;
        
        if (!isActive) {
            canBeDeleted = false;
            status = "Campaign is already deleted";
        } else if (campaign.amountCollected == 0) {
            canBeDeleted = true;
            status = "Campaign has no donations";
        } else if (isExpired) {
            canBeDeleted = true;
            status = "Campaign has expired";
        } else if (isCompleted) {
            canBeDeleted = true;
            status = "Campaign has reached its target";
        } else {
            canBeDeleted = false;
            status = "Campaign is active and cannot be deleted";
        }
        
        return (isActive, isExpired, isCompleted, canBeDeleted, status);
    }

    function withdrawCampaignFunds(uint256 _id) public {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        
        require(campaign.owner == msg.sender, "Only campaign owner can withdraw");
        require(campaign.isActive, "Campaign is not active");
        require(block.timestamp >= campaign.deadline || campaign.amountCollected >= campaign.target, 
                "Campaign must be expired or completed");
        
        uint256 amount = campaign.amountCollected;
        campaign.amountCollected = 0;
        
        (bool sent,) = payable(msg.sender).call{value: amount}("");
        require(sent, "Failed to send funds");
    }

    function reportProfit(uint256 _id, uint256 _profitAmount) public payable {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        require(campaigns[_id].owner == msg.sender, "Only campaign owner can report profit");
        require(campaigns[_id].isActive, "Campaign is not active");
        require(msg.value == _profitAmount, "Sent amount must match reported profit");
        require(block.timestamp >= campaigns[_id].lastProfitReport + campaigns[_id].profitDistributionPeriod, 
                "Must wait for profit distribution period");

        Campaign storage campaign = campaigns[_id];
        campaign.totalProfit += _profitAmount;
        campaign.lastProfitReport = block.timestamp;

        _addHistory(
            _id,
            "profit_reported",
            msg.sender,
            string(abi.encodePacked("Profit reported: ", _profitAmount, " ETH")),
            _profitAmount
        );

        emit ProfitReported(_id, _profitAmount, block.timestamp);
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];
        require(campaign.isActive, "Campaign is not active");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
            
            _addHistory(
                _id,
                "donation",
                msg.sender,
                string(abi.encodePacked("Donation received: ", amount, " ETH")),
                amount
            );

            emit DonationReceived(_id, msg.sender, amount);
        }
    }

    function claimProfit(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(campaign.isActive, "Campaign is not active");
        require(campaign.totalProfit > 0, "No profit available to claim");

        uint256 donatorIndex = type(uint256).max;
        for(uint i = 0; i < campaign.donators.length; i++) {
            if(campaign.donators[i] == msg.sender) {
                donatorIndex = i;
                break;
            }
        }
        require(donatorIndex != type(uint256).max, "You are not a donator of this campaign");

        uint256 donationAmount = campaign.donations[donatorIndex];
        uint256 totalDonations = campaign.amountCollected;
        uint256 profitShare = (campaign.totalProfit * donationAmount) / totalDonations;

        campaign.lastProfitClaim[msg.sender] = block.timestamp;

        _addHistory(
            _id,
            "profit_claimed",
            msg.sender,
            string(abi.encodePacked("Profit claimed: ", profitShare, " ETH")),
            profitShare
        );

        (bool sent,) = payable(msg.sender).call{value: profitShare}("");
        require(sent, "Failed to send profit");

        emit ProfitClaimed(_id, msg.sender, profitShare, block.timestamp);
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (
        address[] memory owners,
        string[] memory titles,
        string[] memory descriptions,
        uint256[] memory targets,
        uint256[] memory deadlines,
        uint256[] memory amountCollecteds,
        string[] memory images,
        bool[] memory isActives,
        uint256[] memory totalProfits,
        uint256[] memory lastProfitReports,
        uint256[] memory profitDistributionPeriods
    ) {
        owners = new address[](numberOfCampaigns);
        titles = new string[](numberOfCampaigns);
        descriptions = new string[](numberOfCampaigns);
        targets = new uint256[](numberOfCampaigns);
        deadlines = new uint256[](numberOfCampaigns);
        amountCollecteds = new uint256[](numberOfCampaigns);
        images = new string[](numberOfCampaigns);
        isActives = new bool[](numberOfCampaigns);
        totalProfits = new uint256[](numberOfCampaigns);
        lastProfitReports = new uint256[](numberOfCampaigns);
        profitDistributionPeriods = new uint256[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            owners[i] = campaign.owner;
            titles[i] = campaign.title;
            descriptions[i] = campaign.description;
            targets[i] = campaign.target;
            deadlines[i] = campaign.deadline;
            amountCollecteds[i] = campaign.amountCollected;
            images[i] = campaign.image;
            isActives[i] = campaign.isActive;
            totalProfits[i] = campaign.totalProfit;
            lastProfitReports[i] = campaign.lastProfitReport;
            profitDistributionPeriods[i] = campaign.profitDistributionPeriod;
        }
    }

    function getCampaignProfitInfo(uint256 _id) public view returns (
        uint256 totalProfit,
        uint256 lastProfitReport,
        uint256 profitDistributionPeriod,
        uint256 nextProfitReport
    ) {
        Campaign storage campaign = campaigns[_id];
        return (
            campaign.totalProfit,
            campaign.lastProfitReport,
            campaign.profitDistributionPeriod,
            campaign.lastProfitReport + campaign.profitDistributionPeriod
        );
    }

    function getDonatorProfitInfo(uint256 _id, address _donator) public view returns (
        uint256 donationAmount,
        uint256 profitShare,
        uint256 lastClaim
    ) {
        Campaign storage campaign = campaigns[_id];
        
        uint256 donatorIndex = type(uint256).max;
        for(uint i = 0; i < campaign.donators.length; i++) {
            if(campaign.donators[i] == _donator) {
                donatorIndex = i;
                break;
            }
        }
        
        if(donatorIndex == type(uint256).max) {
            return (0, 0, 0);
        }

        uint256 donation = campaign.donations[donatorIndex];
        uint256 share = (campaign.totalProfit * donation) / campaign.amountCollected;
        
        return (
            donation,
            share,
            campaign.lastProfitClaim[_donator]
        );
    }

    // Thêm hàm để lấy lịch sử dự án
    function getCampaignHistory(uint256 _id) public view returns (CampaignHistory[] memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        return campaignHistories[_id];
    }

    // Thêm hàm để lấy lịch sử theo loại hành động
    function getCampaignHistoryByAction(uint256 _id, string memory _action) public view returns (CampaignHistory[] memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        
        CampaignHistory[] memory allHistory = campaignHistories[_id];
        uint256 count = 0;
        
        // Đếm số lượng bản ghi phù hợp
        for(uint i = 0; i < allHistory.length; i++) {
            if(keccak256(bytes(allHistory[i].action)) == keccak256(bytes(_action))) {
                count++;
            }
        }
        
        // Tạo mảng kết quả
        CampaignHistory[] memory filteredHistory = new CampaignHistory[](count);
        uint256 index = 0;
        
        // Lọc các bản ghi phù hợp
        for(uint i = 0; i < allHistory.length; i++) {
            if(keccak256(bytes(allHistory[i].action)) == keccak256(bytes(_action))) {
                filteredHistory[index] = allHistory[i];
                index++;
            }
        }
        
        return filteredHistory;
    }
}