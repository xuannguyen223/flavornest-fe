Chạy câu lệnh này trong DevTool để thay đổi trạng thái Login:
localStorage.setItem('auth_token','demo'); localStorage.setItem('display_name','Name'); location.reload()

Muốn Logout thì nhấn "Log Out" hoặc chạy câu lệnh này:
localStorage.removeItem('auth_token'); location.reload()