# BlockFund

BlockFund là một ứng dụng web3 được xây dựng bằng Next.js, cho phép người dùng tương tác với blockchain và quản lý các giao dịch tài chính phi tập trung.

## Tính năng chính

- Tích hợp Web3 và tương tác với blockchain
- Giao diện người dùng hiện đại với Tailwind CSS
- Xác thực và quản lý ví điện tử
- Quản lý giao dịch và tài sản kỹ thuật số
- Tích hợp với ThirdWeb SDK

## Công nghệ sử dụng

- **Frontend Framework**: Next.js 14
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS
- **Web3 Integration**: 
  - ThirdWeb SDK
  - Ethers.js
  - Ethereum Cryptography
- **State Management**: React Query
- **Form Handling**: React Hook Form với Zod validation
- **UI Components**: 
  - Radix UI
  - Framer Motion
  - Lucide React Icons
- **Database**: Prisma ORM

## Yêu cầu hệ thống

- Node.js (phiên bản LTS mới nhất)
- npm hoặc yarn
- MetaMask hoặc ví Web3 tương thích

## Cài đặt

1. Clone repository:
```bash
git clone [repository-url]
cd blockfund
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Cấu hình môi trường:
Tạo file `.env.local` và thêm các biến môi trường cần thiết:
```env
DATABASE_URL="your-database-url"
NEXT_PUBLIC_THIRDWEB_CLIENT_ID="your-thirdweb-client-id"
```

4. Chạy migrations database:
```bash
npx prisma migrate dev
```

5. Khởi chạy development server:
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## Scripts

- `npm run dev`: Khởi chạy development server
- `npm run build`: Build ứng dụng cho production
- `npm run start`: Khởi chạy production server
- `npm run lint`: Kiểm tra lỗi code

## Cấu trúc thư mục

```
blockfund/
├── src/              # Source code chính
├── public/           # Static files
├── prisma/          # Database schema và migrations
├── web3/            # Web3 related code
└── ...
```

## Contributing

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## License

[MIT License](LICENSE)
