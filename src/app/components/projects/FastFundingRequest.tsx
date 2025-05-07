'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { toast } from "react-hot-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { useContract } from "@thirdweb-dev/react"
import { useAddress } from "@thirdweb-dev/react"

interface FastFundingRequestProps {
  campaignId: string
  onSuccess?: () => void
}

const FastFundingRequest = ({ campaignId, onSuccess }: FastFundingRequestProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const [requestReason, setRequestReason] = useState("")
  const [identityVerification, setIdentityVerification] = useState<File | null>(null)
  const [collateral, setCollateral] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const address = useAddress()

  const handleIdentityVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdentityVerification(e.target.files[0])
    }
  }

  const handleCollateralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCollateral(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!address) {
      toast.error("Vui lòng kết nối ví")
      return
    }

    if (!requestReason.trim()) {
      toast.error("Vui lòng nhập lý do cần huy động vốn nhanh")
      return
    }

    if (!identityVerification) {
      toast.error("Vui lòng tải lên giấy tờ xác minh danh tính")
      return
    }

    if (!collateral) {
      toast.error("Vui lòng tải lên tài liệu thế chấp")
      return
    }

    try {
      setIsSubmitting(true)

      // TODO: Upload files to IPFS or other storage
      const identityVerificationUrl = "ipfs://" // Replace with actual upload
      const collateralUrl = "ipfs://" // Replace with actual upload

      await contract?.call("requestFastFunding", [
        campaignId,
        requestReason,
        identityVerificationUrl,
        collateralUrl
      ])

      toast.success("Đã gửi yêu cầu huy động vốn nhanh!")
      setShowDialog(false)
      setRequestReason("")
      setIdentityVerification(null)
      setCollateral(null)
      onSuccess?.()
    } catch (error) {
      console.error("Lỗi khi yêu cầu huy động vốn nhanh:", error)
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Yêu cầu huy động vốn nhanh
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yêu cầu huy động vốn nhanh</DialogTitle>
          <DialogDescription>
            Vui lòng cung cấp thông tin chi tiết về yêu cầu của bạn
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Lý do cần huy động vốn nhanh</Label>
            <Textarea
              placeholder="Nhập lý do chi tiết..."
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label>Xác minh danh tính</Label>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handleIdentityVerificationChange}
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground">
              Tải lên CMND/CCCD/Hộ chiếu hoặc giấy tờ tùy thân khác
            </p>
          </div>

          <div className="space-y-2">
            <Label>Tài liệu thế chấp</Label>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={handleCollateralChange}
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground">
              Tải lên tài liệu chứng minh tài sản thế chấp (sổ đỏ, hợp đồng, v.v.)
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Đang xử lý..." : "Gửi yêu cầu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FastFundingRequest 