import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import './globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <AppSidebar />
            <main style={{ flex: 1 }}>
              <SidebarTrigger />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}