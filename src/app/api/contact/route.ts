import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const lastSubmission = cookieStore.get("last_submit")?.value;
    const now = Date.now();
    if (lastSubmission) {
      const timePassed = now - parseInt(lastSubmission);
      if (timePassed < 3600000) {
        return NextResponse.json(
          { success: false, message: "Debes esperar una hora entre envíos." },
          { status: 429 }
        );
      }
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
    formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY || "");
    formData.delete("h-captcha-response");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: formData,
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
       console.error("Web3Forms sigue bloqueando con Cloudflare. Intenta usar otra red o espera unos minutos.");
       return NextResponse.json({ success: false, message: "Bloqueo de seguridad detectado. Reintenta en breve." }, { status: 502 });
    }
    const result = await response.json();
    if (result.success) {
      const res = NextResponse.json(result);
      res.cookies.set("last_submit", now.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      });
      return res;
    }
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("BACKEND_ERROR:", error);
    return NextResponse.json({ success: false, message: "Error de servidor" }, { status: 500 });
  }
}