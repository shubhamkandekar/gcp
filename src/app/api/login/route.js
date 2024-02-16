import { connectToDb } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "../../lib/userModal";



export async function POST(request) {
  try {
    await connectToDb();
    const body = await request.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json({
        message: "Email is Required",
      });
    }

    if (!password) {
      return NextResponse.json({
        message: "Password is Required",
      });
    }

    const user = await User.findOne({ email }); // Use await here to wait for the result

    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);

      if (checkPassword) {
        return NextResponse.json(
          { status: 200, message: "User Logged in" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { status: 400, message: "Please Check Your Credentials" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { status: 404, message: "No account Found with this email" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
