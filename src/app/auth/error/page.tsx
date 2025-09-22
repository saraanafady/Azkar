"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Suspense } from "react"

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'هناك مشكلة في إعدادات المصادقة'
      case 'AccessDenied':
        return 'تم رفض الوصول'
      case 'Verification':
        return 'فشل في التحقق من الهوية'
      case 'Default':
        return 'حدث خطأ غير متوقع'
      default:
        return 'حدث خطأ في المصادقة'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            خطأ في المصادقة
          </h1>
          
          <p className="text-muted-foreground mb-6">
            {getErrorMessage(error)}
          </p>
          
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة إلى تسجيل الدخول
            </Link>
            
            <Link
              href="/"
              className="w-full border border-border hover:bg-accent text-foreground px-4 py-2 rounded-lg font-medium transition-colors inline-block text-center"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
