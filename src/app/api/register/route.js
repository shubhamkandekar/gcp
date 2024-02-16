import { connectToDb } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { User } from "../../lib/userModal";

export async function POST(request) {
  try {
    await connectToDb();
    const body = await request.json(); // Get the request body directly
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Hash the password securely
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user in the database
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ status: 200, message: 'User created successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
