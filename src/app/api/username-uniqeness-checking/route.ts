import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { userValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const usernameQuerySchema = z.object({
  username: userValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    const result = usernameQuerySchema.safeParse(queryParams);
    if (!result.success) {
      const usernameErros = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErros?.length > 0
              ? usernameErros.join(",")
              : "Invalid query parameters",
        },
        {
          status: 400,
        }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isverified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 200 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
