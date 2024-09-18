* 將不同的功能模組進行分組（例如 `users`, `orders`, `products` 等），每個模組應該包含其控制器、服務、DTO（Data Transfer Object）、驗證器等。

```
app/api/modules/users/
├── users.controller.ts
├── users.service.ts
├── dto/
├── validators/
├── users.module.ts
```