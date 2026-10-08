## Vì sao một số trang web từ chối địa chỉ email tạm thời

Bạn dán một địa chỉ tạm thời vào biểu mẫu đăng ký và nhận được dòng "Vui lòng nhập địa chỉ email hợp lệ". Hoặc biểu mẫu chấp nhận, nhưng email xác nhận không bao giờ đến. Địa chỉ vẫn hoạt động bình thường. Chính trang web đã quyết định không chấp nhận nó. Dưới đây là cách chuyện đó xảy ra, lý do các trang web làm vậy và việc nên làm tiếp theo.

### Trang web nhận ra địa chỉ tạm thời bằng cách nào

Biểu mẫu đăng ký không thấy được bạn là ai, nhưng nó xem được phần đứng sau dấu @.

- **Danh sách chặn tên miền.** Danh sách các tên miền mà dịch vụ email tạm thời sử dụng được công bố và chia sẻ rộng rãi, và nhiều hệ thống đăng ký đối chiếu địa chỉ mới với các danh sách đó. Đây là cách thường dùng.
- **Dịch vụ kiểm tra email.** Một số trang web chuyển mọi địa chỉ mới cho một dịch vụ kiểm tra của bên thứ ba, và dịch vụ này trả về một nhãn như "dùng một lần" hay "rủi ro".
- **Tra cứu máy chủ thư.** Máy chủ nào nhận thư cho một tên miền là thông tin công khai. Trang web có thể chặn mọi tên miền trỏ đến cùng máy chủ thư với một dịch vụ tạm thời đã biết.
- **Quy tắc về kiểu mẫu và tuổi đời.** Tên miền mới đăng ký, hoặc địa chỉ trông như do máy tạo ra, có thể bị chấm điểm rủi ro cao hơn.

Không việc nào trong số này cần đọc thư của bạn hay biết bất cứ điều gì về bạn. Đó là một đánh giá về tên miền.

### Vì sao các trang web làm vậy

- **Lạm dụng dùng thử miễn phí và mã giảm giá.** Nếu cứ có địa chỉ mới là thêm một lần dùng thử miễn phí hay thêm một ưu đãi chào mừng, thì địa chỉ dùng một lần khiến ưu đãi đó thành vô hạn.
- **Tài khoản giả và tài khoản hàng loạt.** Bot phát tán thư rác và đánh giá giả sống nhờ những địa chỉ tạo ra mà không tốn gì.
- **Họ cần liên lạc với bạn về sau.** Một dịch vụ gửi hóa đơn, cảnh báo bảo mật hay thư đặt lại mật khẩu thực sự cần một địa chỉ mà bạn sẽ còn giữ.
- **Họ muốn có danh sách gửi thư.** Bộ phận tiếp thị chẳng thu được gì từ một địa chỉ không ai đọc.
- **Uy tín gửi thư của họ.** Thư gửi đến những địa chỉ không ai mở làm giảm mức đánh giá của các nhà cung cấp hộp thư đối với bên gửi, nên một số công ty lọc bỏ những địa chỉ như vậy ngay từ khâu đăng ký.

Phần lớn các lý do trên là để bảo vệ trang web. Riêng việc họ cần liên lạc với bạn về sau thì cũng bảo vệ cả bạn: tài khoản gắn với một hộp thư mà bạn không vào lại được là một vấn đề thật sự.

### Bị chặn trông như thế nào

- Thông báo lỗi ngay trong biểu mẫu: "email không hợp lệ", "vui lòng dùng email cá nhân hoặc email công việc", "nhà cung cấp email này không được hỗ trợ".
- Biểu mẫu chấp nhận địa chỉ, nhưng email xác minh không bao giờ đến. Một số trang web đơn giản là không gửi.
- Tài khoản được tạo, rồi về sau bị hạn chế hoặc yêu cầu bạn thêm một địa chỉ khác.

Trường hợp thứ hai rất dễ bị nhầm với việc thư đến chậm thông thường. Nếu sau vài phút và một lần gửi lại mà vẫn chưa có gì, nhiều khả năng là bạn đã bị chặn. Danh sách kiểm tra trong bài [Không nhận được email OTP](/blog/otp-email-not-arriving-fixes) giúp bạn loại trừ các nguyên nhân khác trước.

### Những cách không có tác dụng

- **Tạo một địa chỉ khác.** Mọi địa chỉ smail.pw đều có đuôi @smail.pw. Nếu tên miền bị chặn thì địa chỉ mới trên cùng tên miền cũng bị chặn.
- **Bấm gửi lại hết lần này đến lần khác.** Yêu cầu lặp đi lặp lại có thể khiến bạn bị giới hạn tần suất, mà cũng chẳng cho bạn biết thêm điều gì.
- **Săn tìm một dịch vụ tạm thời mà trang web chưa đưa vào danh sách.** Hôm nay có thể được, ngày mai lại không, và bạn sẽ dựng tài khoản trên một địa chỉ mà bạn đã biết là trang web không muốn.

### Những cách có tác dụng

Hãy xác định tài khoản quan trọng đến mức nào, rồi chọn:

- **Bạn chỉ muốn xem qua một chút.** Hãy tự hỏi trang web đó có đáng để bạn đưa một địa chỉ hay không. Bỏ đi cũng là một câu trả lời hợp lý.
- **Bạn muốn có tài khoản, nhưng không muốn nhận thư tiếp thị.** Hãy dùng bí danh email, đôi khi còn gọi là địa chỉ ẩn danh hay "ẩn địa chỉ email của tôi". Nhiều nhà cung cấp email và trình quản lý mật khẩu có tính năng này. Bí danh chuyển tiếp thư về hộp thư thật của bạn, sau này có thể tắt đi, và được các biểu mẫu đăng ký chấp nhận thường xuyên hơn nhiều. Xem [email tạm thời và bí danh email](/blog/temporary-email-vs-email-alias).
- **Bạn muốn biết ai chia sẻ địa chỉ của mình.** Nhiều nhà cung cấp email chuyển thư gửi tới yourname+shop@example.com về yourname@example.com. Cách này không giấu địa chỉ của bạn, nhưng cho phép bạn lọc thư và biết thư đến từ đâu. Một số biểu mẫu không chấp nhận dấu cộng.
- **Tài khoản quan trọng.** Hãy dùng địa chỉ thật của bạn. Bất cứ thứ gì liên quan đến tiền, công việc hay việc khôi phục các tài khoản khác thì ngay từ đầu đã không nên đặt trên hộp thư tạm thời.

### Dùng địa chỉ tạm thời có sai không?

Dùng nó để giữ hộp thư gọn gàng là chính đáng. Trang web cũng có quyền tự đặt quy định đăng ký của mình, và điều khoản của họ có thể yêu cầu một địa chỉ mà họ liên lạc được với bạn. Dùng địa chỉ dùng một lần để nhận đi nhận lại cùng một gói dùng thử, hoặc để tạo tài khoản giả, là lạm dụng, và đó là lý do chính khiến có những biện pháp chặn này.

### Tóm lại

Bị từ chối là một quyết định về tên miền, không phải lỗi mà bạn sửa được bằng cách thử lại. Địa chỉ tạm thời hợp với những trang web chấp nhận nó và những tài khoản mà mất đi bạn cũng không tiếc. Với mọi trường hợp còn lại, bí danh hoặc địa chỉ của chính bạn là con đường nhanh hơn.
