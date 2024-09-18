import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 假設這裡已經驗證了用戶（可以透過 bcrypt 等方式驗證）
  const user = { id: 1, email }; // 用戶資料

  // 生成 JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // 設置 HttpOnly cookie
  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', token, { httpOnly: true, secure: true, path: '/', sameSite: 'lax' });

  return response;
}
