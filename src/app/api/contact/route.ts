import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

export async function POST(request: Request) {
    const t = await getTranslations("Texts");
  try {
    const cookieStore = await cookies();
    const lastSubmission = cookieStore.get("last_submit")?.value;
    const now = Date.now();
    if (lastSubmission && (now - parseInt(lastSubmission) < 3600000)) {
      return NextResponse.json({ success: false, message: t("throttleMessage") }, { status: 429 });
    }
    const formData = await request.formData();
    const captchaToken = formData.get("h-captcha-response");
    if (!captchaToken) {
      return NextResponse.json({ success: false, message: "Captcha incompleto" }, { status: 400 });
    }
    const verifyCaptcha = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY || "",
        response: captchaToken.toString(),
      }),
    });
    const captchaResult = await verifyCaptcha.json();
    if (!captchaResult.success) {
      return NextResponse.json({ success: false, message: "Captcha inválido" }, { status: 400 });
    }
    const res = NextResponse.json({ success: true, message: "Captcha validado" });
    res.cookies.set("last_submit", now.toString(), {
      httpOnly: true,
      secure: true,
      maxAge: 3600,
      path: "/",
    });
    return res;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
  }
}