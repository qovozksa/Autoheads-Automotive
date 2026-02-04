
import React, { useState } from 'react';
import { 
  X, Plus, Edit2, Trash2, Save, LogOut, Car, MessageSquare, Settings, 
  Eye, EyeOff, LayoutTemplate, Star, CheckCircle, Menu
} from 'lucide-react';
import { CarModel, Review } from '../types';

interface DashboardProps {
  cars: CarModel[];
  setCars: (cars: CarModel[]) => void;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  onExit: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ cars, setCars, reviews, setReviews, onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'cars' | 'reviews' | 'settings'>('cars');
  const [editingCar, setEditingCar] = useState<CarModel | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const handleLogin = () => {
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Passcode. For this demo, use: admin');
    }
  };

  const deleteCar = (id: string) => {
    if (confirm('Are you sure you want to remove this vehicle from the database?')) {
      setCars(cars.filter(c => c.id !== id));
    }
  };

  const deleteReview = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const toggleHero = (id: string) => {
    setCars(cars.map(c => c.id === id ? { ...c, showInHero: !c.showInHero } : c));
  };

  const toggleInventory = (id: string) => {
    setCars(cars.map(c => c.id === id ? { ...c, showInInventory: !c.showInInventory } : c));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl glass-morphism text-center">
          <Car className="mx-auto mb-6 text-blue-500 w-12 h-12" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Control Panel Login</h2>
          <p className="text-[#666] mb-8 uppercase text-[10px] tracking-widest font-bold">Authorized Access Only</p>
          <input 
            type="password" 
            placeholder="Owner Passcode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full bg-black border border-white/10 rounded-full px-6 py-4 mb-4 outline-none focus:border-blue-500 transition-colors text-center text-lg"
          />
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Authenticate
          </button>
          <button onClick={onExit} className="mt-6 text-[10px] text-[#444] hover:text-white uppercase tracking-widest">Return to Showroom</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-50 gap-4 sm:gap-0">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <div className="truncate">
            <h1 className="text-lg md:text-xl font-bold uppercase tracking-tight truncate">Autoheads Dashboard</h1>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em]">Showroom Management v1.0</p>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
          <button onClick={onExit} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 border border-white/10 hover:border-white/20 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all">
            <Eye size={14} className="hidden xs:block" /> Preview
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
            <LogOut size={14} className="hidden xs:block" /> Exit
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar / Top Nav on Mobile */}
        <nav className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-white/5 p-4 md:p-6 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar shrink-0">
          <button 
            onClick={() => setActiveTab('cars')}
            className={`flex items-center gap-3 p-3 md:p-4 rounded-lg transition-all text-[10px] md:text-sm font-bold uppercase tracking-widest whitespace-nowrap shrink-0 ${activeTab === 'cars' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-[#666] hover:text-white hover:bg-white/5'}`}
          >
            <Car size={18} /> Manage Fleet
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-3 p-3 md:p-4 rounded-lg transition-all text-[10px] md:text-sm font-bold uppercase tracking-widest whitespace-nowrap shrink-0 ${activeTab === 'reviews' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-[#666] hover:text-white hover:bg-white/5'}`}
          >
            <MessageSquare size={18} /> Testimonials
          </button>
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-black/20">
          {activeTab === 'cars' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4">
                <h2 className="text-3xl md:text-4xl font-serif italic">Inventory Control</h2>
                <button 
                  onClick={() => setEditingCar({ id: Date.now().toString(), name: '', category: '', tagline: '', specs: '', price: '', image: '', details: { hp: '', topSpeed: '', acceleration: '', engine: '' }, type: 'NEW ARRIVAL', showInHero: false, showInInventory: true })}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all rounded-sm"
                >
                  <Plus size={16} /> Add Vehicle
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {cars.map(car => (
                  <div key={car.id} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 group hover:border-blue-500/30 transition-all">
                    <div className="w-full sm:w-48 h-40 sm:h-32 overflow-hidden rounded shrink-0 bg-neutral-900">
                      <img src={car.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2">
                        <span className="text-[10px] bg-blue-600/10 text-blue-500 px-2 py-0.5 rounded font-bold whitespace-nowrap">{car.type}</span>
                        <h3 className="text-lg md:text-xl font-bold truncate">{car.name}</h3>
                      </div>
                      <p className="text-xs md:text-sm text-[#666] mb-4 truncate">{car.specs}</p>
                      
                      <div className="flex flex-wrap gap-4 md:gap-6">
                        <button 
                          onClick={() => toggleHero(car.id)}
                          className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${car.showInHero ? 'text-blue-500' : 'text-[#444] hover:text-[#888]'}`}
                        >
                          <LayoutTemplate size={14} /> {car.showInHero ? 'On Hero' : 'Show on Hero'}
                        </button>
                        <button 
                          onClick={() => toggleInventory(car.id)}
                          className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${car.showInInventory ? 'text-blue-500' : 'text-[#444] hover:text-[#888]'}`}
                        >
                          <Eye size={14} /> {car.showInInventory ? 'In Grid' : 'Hidden from Grid'}
                        </button>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <button 
                        onClick={() => setEditingCar(car)}
                        className="flex-1 sm:flex-none p-3 border border-white/5 rounded-full flex items-center justify-center hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteCar(car.id)}
                        className="flex-1 sm:flex-none p-3 border border-white/5 rounded-full flex items-center justify-center hover:border-red-500/50 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4">
                <h2 className="text-3xl md:text-4xl font-serif italic">Testimonials Management</h2>
                <button 
                  onClick={() => setEditingReview({ id: Date.now().toString(), name: '', role: '', avatar: '', rating: 5, comment: '', verified: true })}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all rounded-sm"
                >
                  <Plus size={16} /> New Review
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {reviews.map(review => (
                  <div key={review.id} className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-lg flex flex-col gap-4 hover:border-blue-500/20 transition-all">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 truncate">
                        <img src={review.avatar} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        <div className="truncate">
                          <p className="font-bold truncate">{review.name}</p>
                          <p className="text-[10px] text-[#666] uppercase truncate">{review.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => setEditingReview(review)} className="p-2 hover:text-blue-500 transition-colors"><Edit2 size={14} /></button>
                        <button onClick={() => deleteReview(review.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <p className="text-sm text-[#A0A0A0] italic line-clamp-3">"{review.comment}"</p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={10} className="fill-blue-500 text-blue-500" />)}
                      </div>
                      {review.verified && <span className="text-[9px] text-blue-500 flex items-center gap-1 font-bold uppercase"><CheckCircle size={10} /> Verified</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Editor Modal (Cars) */}
      {editingCar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl bg-[#0D0D0D] border border-white/10 p-6 md:p-12 rounded-lg my-auto">
            <h3 className="text-2xl md:text-3xl font-serif italic mb-6 md:mb-8">{editingCar.name || 'New Vehicle'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] font-bold mb-2">Vehicle Name</label>
                  <input value={editingCar.name} onChange={(e) => setEditingCar({...editingCar, name: e.target.value})} className="w-full bg-black border border-white/10 p-3 md:p-4 outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] font-bold mb-2">Category</label>
                  <input value={editingCar.category} onChange={(e) => setEditingCar({...editingCar, category: e.target.value})} className="w-full bg-black border border-white/10 p-3 md:p-4 outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] font-bold mb-2">Price</label>
                  <input value={editingCar.price} onChange={(e) => setEditingCar({...editingCar, price: e.target.value})} className="w-full bg-black border border-white/10 p-3 md:p-4 outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] font-bold mb-2">Status Type</label>
                  <select value={editingCar.type} onChange={(e) => setEditingCar({...editingCar, type: e.target.value as any})} className="w-full bg-black border border-white/10 p-3 md:p-4 outline-none focus:border-blue-500 text-sm">
                    <option>NEW ARRIVAL</option>
                    <option>LIMITED EDITION</option>
                    <option>CERTIFIED PRE-OWNED</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] font-bold mb-2">Image URL</label>
                  <input value={editingCar.image} onChange={(e) => setEditingCar({...editingCar, image: e.target.value})} className="w-full bg-black border border-white/10 p-3 md:p-4 outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] font-bold mb-2">Specs Summary</label>
                  <input value={editingCar.specs} onChange={(e) => setEditingCar({...editingCar, specs: e.target.value})} className="w-full bg-black border border-white/10 p-3 md:p-4 outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#666] font-bold mb-2">Tagline</label>
                  <textarea value={editingCar.tagline} onChange={(e) => setEditingCar({...editingCar, tagline: e.target.value})} className="w-full bg-black border border-white/10 p-3 md:p-4 outline-none focus:border-blue-500 h-20 md:h-24 text-sm" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 border-t border-white/5 pt-6 md:pt-8">
              <button 
                onClick={() => {
                  if (!editingCar.name) return alert('Vehicle Name is required');
                  const updated = editingCar.id && cars.find(c => c.id === editingCar.id) 
                    ? cars.map(c => c.id === editingCar.id ? editingCar : c)
                    : [...cars, { ...editingCar, id: Date.now().toString() }];
                  setCars(updated);
                  setEditingCar(null);
                }}
                className="flex-1 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
              >
                Save Vehicle
              </button>
              <button onClick={() => setEditingCar(null)} className="py-4 px-10 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal (Reviews) */}
      {editingReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0D0D0D] border border-white/10 p-6 md:p-12 rounded-lg my-auto">
            <h3 className="text-2xl md:text-3xl font-serif italic mb-6 md:mb-8">Testimonial Detail</h3>
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input placeholder="Client Name" value={editingReview.name} onChange={(e) => setEditingReview({...editingReview, name: e.target.value})} className="w-full bg-black border border-white/10 p-4 outline-none focus:border-blue-500 text-sm" />
                <input placeholder="Role / Occupation" value={editingReview.role} onChange={(e) => setEditingReview({...editingReview, role: e.target.value})} className="w-full bg-black border border-white/10 p-4 outline-none focus:border-blue-500 text-sm" />
              </div>
              <input placeholder="Avatar URL" value={editingReview.avatar} onChange={(e) => setEditingReview({...editingReview, avatar: e.target.value})} className="w-full bg-black border border-white/10 p-4 outline-none focus:border-blue-500 text-sm" />
              <textarea placeholder="Comment" value={editingReview.comment} onChange={(e) => setEditingReview({...editingReview, comment: e.target.value})} className="w-full bg-black border border-white/10 p-4 outline-none focus:border-blue-500 h-24 md:h-32 text-sm" />
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editingReview.verified} onChange={(e) => setEditingReview({...editingReview, verified: e.target.checked})} className="w-4 h-4 accent-blue-600" />
                  <span className="text-xs uppercase font-bold text-[#666]">Verified Owner</span>
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase font-bold text-[#666]">Rating:</span>
                  <select value={editingReview.rating} onChange={(e) => setEditingReview({...editingReview, rating: parseInt(e.target.value)})} className="bg-black border border-white/10 p-2 text-xs outline-none focus:border-blue-500">
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 border-t border-white/5 pt-6 md:pt-8">
              <button 
                onClick={() => {
                  if (!editingReview.name) return alert('Name is required');
                  const updated = editingReview.id && reviews.find(r => r.id === editingReview.id) 
                    ? reviews.map(r => r.id === editingReview.id ? editingReview : r)
                    : [...reviews, { ...editingReview, id: Date.now().toString() }];
                  setReviews(updated);
                  setEditingReview(null);
                }}
                className="flex-1 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
              >
                Save Testimonial
              </button>
              <button onClick={() => setEditingReview(null)} className="py-4 px-10 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
