import React from 'react'
import { ProductCatalog } from './components/ProductCatalog'
import { AdminStockTable } from './components/AdminStockTable'
import { AdminLogistics } from './components/AdminLogistics'
import { AdminClients } from './components/AdminClients'
import { AdminSettings } from './components/AdminSettings'
import { AdminMarketing } from './components/AdminMarketing'
import { LoginForm } from './components/LoginForm'
import { CustomerAccount } from './components/CustomerAccount'
import { CartSheet } from './components/CartSheet'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from './components/ui/button'
import { ShoppingBag, User, LogOut, LayoutGrid, ClipboardList, Users, Menu, Settings, Megaphone } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

type View = 'login' | 'customer-portal' | 'customer-account' | 'admin-stock' | 'admin-logistics' | 'admin-clients' | 'admin-marketing' | 'admin-settings';

function App() {
  const [view, setView] = React.useState<View>('login')
  const [userRole, setUserRole] = React.useState<'customer' | 'admin' | null>(null)
  const [cart, setCart] = React.useState<Record<number, number>>({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const handleLogin = (role: 'customer' | 'admin') => {
    setUserRole(role)
    setView(role === 'admin' ? 'admin-stock' : 'customer-portal')
  }

  const handleLogout = () => {
    setUserRole(null)
    setView('login')
    setCart({})
  }

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/products')
      return response.data
    },
    enabled: !!userRole
  })

  const cartItems = React.useMemo(() => {
    return Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = products?.find((p: any) => p.id === parseInt(id))
        return {
          id: parseInt(id),
          sku: product?.sku || '',
          name: product?.name || '',
          qty,
          price: product?.prices?.[0]?.price || 0,
        }
      })
  }, [cart, products])

  const handleQtyChange = (productId: number, qty: number) => {
    setCart((prev) => ({ ...prev, [productId]: qty }))
  }

  const handleRemoveItem = (id: number) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        userId: 1,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.qty,
          price: item.price,
        })),
        totalPrice: cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0),
        status: 'PENDING',
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }
      return axios.post('http://localhost:3000/orders', payload)
    },
    onSuccess: () => {
      alert('Objednávka bola úspešne odoslaná!')
      setCart({})
      setView('customer-account')
    }
  })

  const handleNavClick = (newView: View) => {
    setView(newView)
    setIsMobileMenuOpen(false)
  }

  if (view === 'login') return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-[#fbfaf8] flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Industrial Background Pattern Overlay */}
      <div className="fixed inset-0 industrial-grid pointer-events-none z-0" />

      {/* PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-black/5 px-4 md:px-8 h-20 md:h-24 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 md:gap-16 relative z-10 w-full justify-between md:justify-start">

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden -ml-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-[#fbfaf8] border-r border-black/5">
              <div className="flex flex-col h-full py-8 space-y-8">
                <div className="px-4">
                  <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">NAEN.</h2>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mt-2">Mobile B2B Zone</p>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  {userRole === 'customer' ? (
                    <>
                      <MobileNavButton active={view === 'customer-portal'} onClick={() => handleNavClick('customer-portal')} icon={<ShoppingBag className="h-5 w-5" />} label="Katalóg" />
                      <MobileNavButton active={view === 'customer-account'} onClick={() => handleNavClick('customer-account')} icon={<User className="h-5 w-5" />} label="Môj Účet" />
                    </>
                  ) : (
                    <>
                      <MobileNavButton active={view === 'admin-stock'} onClick={() => handleNavClick('admin-stock')} icon={<LayoutGrid className="h-5 w-5" />} label="Sklad & Produkty" />
                      <MobileNavButton active={view === 'admin-logistics'} onClick={() => handleNavClick('admin-logistics')} icon={<ClipboardList className="h-5 w-5" />} label="Logistika" />
                      <MobileNavButton active={view === 'admin-clients'} onClick={() => handleNavClick('admin-clients')} icon={<Users className="h-5 w-5" />} label="Partneri" />
                      <MobileNavButton active={view === 'admin-marketing'} onClick={() => handleNavClick('admin-marketing')} icon={<Megaphone className="h-5 w-5" />} label="Marketing" />
                      <MobileNavButton active={view === 'admin-settings'} onClick={() => handleNavClick('admin-settings')} icon={<Settings className="h-5 w-5" />} label="Nastavenia" />
                    </>
                  )}
                </div>

                <div className="px-4 pb-8">
                  <Button onClick={handleLogout} variant="outline" className="w-full h-12 border-destructive/20 text-destructive hover:bg-destructive hover:text-white uppercase font-black tracking-widest text-xs rounded-xl">
                    Odhlásiť sa
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div
            className="flex items-baseline gap-2 cursor-pointer group select-none"
            onClick={() => setView(userRole === 'admin' ? 'admin-stock' : 'customer-portal')}
          >
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-all duration-300">NAEN.</h1>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 transition-opacity hidden md:inline">Zone</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-black/5 p-1 rounded-full">
            {userRole === 'customer' ? (
              <>
                <NavButton
                  active={view === 'customer-portal'}
                  onClick={() => setView('customer-portal')}
                  icon={<ShoppingBag className="h-4 w-4" />}
                  label="Katalóg"
                />
                <NavButton
                  active={view === 'customer-account'}
                  onClick={() => setView('customer-account')}
                  icon={<User className="h-4 w-4" />}
                  label="Môj Účet"
                />
              </>
            ) : (
              <>
                <NavButton
                  active={view === 'admin-stock'}
                  onClick={() => setView('admin-stock')}
                  icon={<LayoutGrid className="h-4 w-4" />}
                  label="Sklad & Produkty"
                />
                <NavButton
                  active={view === 'admin-logistics'}
                  onClick={() => setView('admin-logistics')}
                  icon={<ClipboardList className="h-4 w-4" />}
                  label="Logistika"
                />
                <NavButton
                  active={view === 'admin-clients'}
                  onClick={() => setView('admin-clients')}
                  icon={<Users className="h-4 w-4" />}
                  label="Partneri"
                />
                <NavButton
                  active={view === 'admin-marketing'}
                  onClick={() => setView('admin-marketing')}
                  icon={<Megaphone className="h-4 w-4" />}
                  label="Marketing"
                />
                <NavButton
                  active={view === 'admin-settings'}
                  onClick={() => setView('admin-settings')}
                  icon={<Settings className="h-4 w-4" />}
                  label="Nastavenia"
                />
              </>
            )}
          </nav>

          <div className="flex items-center gap-4 md:gap-6 relative z-10 w-fit">
            {userRole === 'customer' && (
              <div className="flex items-center gap-6">
                <div className="text-right hidden xl:block leading-tight border-r pr-6 border-black/10">
                  <span className="block font-black text-sm uppercase tracking-tight">Gastro Palace s.r.o.</span>
                  <div className="flex items-baseline justify-end gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="font-mono text-[9px] font-bold opacity-40 uppercase tracking-widest">B2B Gold Partner</span>
                  </div>
                </div>
                <CartSheet
                  items={cartItems}
                  onRemove={handleRemoveItem}
                  onCheckout={() => checkoutMutation.mutate()}
                />
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hidden md:flex rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors group"
            >
              <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="relative z-10 flex-1 p-4 md:p-8 lg:p-12 max-w-[1800px] mx-auto w-full animate-in fade-in duration-700">
        {view === 'customer-portal' && <ProductCatalog cart={cart} onQtyChange={handleQtyChange} />}
        {view === 'customer-account' && <CustomerAccount />}
        {view === 'admin-stock' && <AdminStockTable />}
        {view === 'admin-logistics' && <AdminLogistics />}
        {view === 'admin-clients' && <AdminClients />}
        {view === 'admin-marketing' && <AdminMarketing />}
        {view === 'admin-settings' && <AdminSettings />}
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="relative z-10 px-6 md:px-12 py-16 mt-20 border-t border-black/5 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.02] select-none pointer-events-none">
          <span className="text-[100px] md:text-[200px] font-black leading-none uppercase">NAEN.</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter">NAEN.</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mt-1">Industrial Natural Wine B2B Tool</span>
            </div>
            <div className="flex flex-wrap gap-8 font-mono text-[10px] font-bold uppercase tracking-widest opacity-40">
              <a href="#" className="hover:text-primary transition-colors">Podmienky</a>
              <a href="#" className="hover:text-primary transition-colors">Kontakt</a>
              <a href="#" className="hover:text-primary transition-colors">Pá a Pi!</a>
            </div>
          </div>

          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 text-right">
            <span>&copy; 2026 NAEN.sk / Developed for Quality</span>
            <p className="mt-2">Vercel Edge Ready / Prisma DB Connect / BullMQ Worker</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300
        ${active
          ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
          : 'text-black/40 hover:text-black hover:bg-white/50'
        }
      `}
    >
      {icon}
      {label}
    </button>
  )
}

function MobileNavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all
        ${active
          ? 'bg-primary text-white shadow-xl shadow-primary/20'
          : 'text-black/60 hover:bg-black/5'
        }
      `}
    >
      {icon}
      {label}
    </button>
  )
}

export default App
