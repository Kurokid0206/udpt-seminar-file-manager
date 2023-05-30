# Outline for seminar

## AWS S3

### AWS là gì?

- AWS là một dịch vụ đám mây của Amazon. AWS cung cấp các dịch vụ đám mây như: máy chủ ảo, lưu trữ, cơ sở dữ liệu, mạng, phân tích, AI, IoT, ... AWS cung cấp các dịch vụ đám mây thông qua các trung tâm dữ liệu trên toàn thế giới. AWS cung cấp các dịch vụ đám mây thông qua các trung tâm dữ liệu trên toàn thế giới. AWS cung cấp các dịch vụ đám mây thông qua các trung tâm dữ liệu trên toàn thế giới. AWS cung cấp các dịch vụ đám mây thông qua các trung tâm dữ liệu trên toàn thế giới. AWS cung cấp các dịch vụ đám mây thông qua các trung tâm dữ liệu trên toàn thế giới. AWS cung cấp các dịch vụ đám mây thông qua các trung tâm dữ liệu trên toàn thế giới. AWS cung cấp các dịch vụ đám mây thông qua các trung tâm dữ liệu trên toàn thế giới. AWS cung cấp các dịch vụ đám mây thông qua các trung tâm dữ liệu trên toàn thế giới.

### AWS S3 là gì?

- Tìm hiểu AWS S3
  - AWS S3 là một dịch vụ lưu trữ đám mây của Amazon. AWS S3 cung cấp các dịch vụ lưu trữ đám mây như: lưu trữ, lưu trữ dự phòng,
- Giới thiệu, vì sao nên sử dụng AWS S3, độ phổ biến của AWS S3

### Các ứng dụng của AWS S3

- Backup and storage
- Disaster Recovery
- Archive
- Hybrid Cloud storage
- Media hosting
- Data lakes & big data analytics
- Static website
- => Nói về các ứng dụng của AWS S3

### S3 Buckets và S3 Objects

- S3 Bucket: là nơi lưu trữ các file, được lưu trữ trong một vùng AWS S3. Tên của bucket phải là duy nhất trên toàn thế giới. Tên của bucket có thể được sử dụng như một URL để truy cập vào bucket. Ví dụ: `https://s3.console.aws.amazon.com/s3/buckets/my-bucket`
- Objects: là các file được lưu trữ trong bucket. Mỗi object có một key duy nhất. Key của object có thể được sử dụng như một URL để truy cập vào object. Ví dụ: `https://s3.console.aws.amazon.com/s3/object/my-bucket/my-object.jpg`. Mỗi object có thể có một hoặc nhiều metadata. Metadata là các thông tin mô tả về object. Metadata có thể được sử dụng để lưu trữ các thông tin như: ngày tạo, ngày chỉnh sửa, người tạo, người chỉnh sửa, ... Mỗi object có thể có một hoặc nhiều object access control list (ACL). ACL được sử dụng để quản lý quyền truy cập vào object. Mỗi object có thể có một hoặc nhiều object tags. Object tags được sử dụng để phân loại các object. Mỗi object có thể có một hoặc nhiều object retention. Object retention được sử dụng để đảm bảo tính toàn vẹn của object. Mỗi object có thể có một hoặc nhiều object legal hold. Object legal hold được sử dụng để đảm bảo tính toàn vẹn của object.

### S3 Access Control

- S3 Access Control List (ACL): được sử dụng để quản lý quyền truy cập vào object. Có 2 loại ACL: ACL của bucket và ACL của object. ACL của bucket được sử dụng để quản lý quyền truy cập vào bucket. ACL của object được sử dụng để quản lý quyền truy cập vào object. Có 3 loại ACL của object: ACL của owner, ACL của các user được chỉ định, ACL của các user được chỉ định bởi bucket owner.
- S3 Bucket Policy: được sử dụng để quản lý quyền truy cập vào bucket. Có thể sử dụng bucket policy để quản lý quyền truy cập vào các object trong bucket. Có thể sử dụng bucket policy để quản lý quyền truy cập vào các bucket khác.
- S3 IAM Policy: được sử dụng để quản lý quyền truy cập vào bucket. Có thể sử dụng IAM policy để quản lý quyền truy cập vào các object trong bucket. Có thể sử dụng IAM policy để quản lý quyền truy cập vào các bucket khác.
- S3 Object Lock: được sử dụng để đảm bảo tính toàn vẹn của object. Có 2 loại object lock: object lock retention và object lock legal hold. Object lock retention được sử dụng để đảm bảo tính toàn vẹn của object. Object lock legal hold được sử dụng để đảm bảo tính toàn vẹn của object.
- S3 Bucket Owner: là người sở hữu bucket. S3 Bucket Owner có thể quản lý quyền truy cập vào bucket. S3 Bucket Owner có thể quản lý quyền truy cập vào các object trong bucket. S3 Bucket Owner có thể quản lý quyền truy cập vào các bucket khác.
- S3 Object Owner: là người sở hữu object. S3 Object Owner có thể quản lý quyền truy cập vào object.
- S3 Bucket User: là người được cấp quyền truy cập vào bucket. S3 Bucket User có thể quản lý quyền truy cập vào các object trong bucket. S3 Bucket User có thể quản lý quyền truy cập vào các bucket khác.
- S3 Object User: là người được cấp quyền truy cập vào object. S3 Object User có thể quản lý quyền truy cập vào object.
- S3 Bucket Group: là nhóm được cấp quyền truy cập vào bucket. S3 Bucket Group có thể quản lý quyền truy cập vào các object trong bucket. S3 Bucket Group có thể quản lý quyền truy cập vào các bucket khác.
- S3 Object Group: là nhóm được cấp quyền truy cập vào object. S3 Object Group có thể quản lý quyền truy cập vào object.

### Xây dựng ứng dụng demo

- Ứng dụng quản lý file
- Xây dựng back-end
- Xây dựng front-end
  - Thiết kế giao diện
  - Xây dựng các chức năng: upload, download, delete, rename, share, ...

## Phân công công việc

| STT | Nội dung                | Người thực hiện                                    |
| --- | ----------------------- | -------------------------------------------------- |
| 1   | Tìm hiểu AWS S3         | 18120289 - Lâm Quốc Bình                           |
| 2   | Các ứng dụng của AWS S3 | 19120640 - Trần Minh Sơn                           |
| 3   | S3 Buckets và Objects   | 19120640 - Trần Minh Sơn \n 19120674 - Phạm Tân Tị |
| 5   | S3 Access Control       | 19120630 - Nguyễn Văn Quân                         |
| 6   | Xây dựng back-end       | 19120674 - Phạm Tân Tị                             |
| 7   | Xây dựng front-end      | Cả nhóm                                            |
