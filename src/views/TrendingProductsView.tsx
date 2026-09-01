import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import {
  Flame,
  Search,
  Filter,
  Star,
  Heart,
  Send,
  Sparkles,
  Truck,
  LayoutGrid,
  List,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';

interface TrendingProductsViewProps {
  onSelectProduct: (product: Product) => void;
  onOpenCampaignModal: (product: Product) => void;
}

export const TrendingProductsView: React.FC<TrendingProductsViewProps> = ({
  onSelectProduct,
  onOpenCampaignModal
}) => {
  const {
    products,
    selectedCountry,
    selectedCity,
    formatCurrency,
    toggleFavorite
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [minOpportunityIndex, setMinOpportunityIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const categories = ['all', ...Array.from(new Set((products || []).map(p => p.category).filter(Boolean)))];
  const platforms = ['all', ...Array.from(new Set((products || []).map(p => p.platformName).filter(Boolean)))];

  const filteredProducts = (products || []).filter(p => {
    if (!p) return false;
    if (onlyFavorites && !p.isFavorite) return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedPlatform !== 'all' && p.platformName !== selectedPlatform) return false;
    if ((p.opportunityIndex ?? 0) < minOpportunityIndex) return false;
    if (
      searchTerm &&
      !(p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(p.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const getOpportunityBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-500 text-slate-950';
    if (score >= 80) return 'bg-cyan-500 text-slate-950';
    if (score >= 70) return 'bg-amber-500 text-slate-950';
    return 'bg-slate-700 text-white';
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>Algoritmo de Oportunidades & Margens</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Produtos em Tendência Global
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Descubra os produtos com maior tração de compras, margens auditadas e elegibilidade para campanhas automatizadas em {selectedCountry} ({selectedCity}).
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}
              title="Visualização em Grade"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}
              title="Visualização em Lista"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Text Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nome ou palavra-chave..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none capitalize"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? 'Todas as Categorias' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div>
            <select
              value={selectedPlatform}
              onChange={e => setSelectedPlatform(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              {platforms.map(p => (
                <option key={p} value={p}>
                  {p === 'all' ? 'Todas as Plataformas' : p}
                </option>
              ))}
            </select>
          </div>

          {/* Opportunity Index Filter Slider */}
          <div className="flex items-center gap-2 px-2">
            <span className="text-[11px] text-slate-400 whitespace-nowrap">Índice Mín: <strong className="text-emerald-400">{minOpportunityIndex}+</strong></span>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minOpportunityIndex}
              onChange={e => setMinOpportunityIndex(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        {/* Favorite toggle chip */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-850 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                onlyFavorites
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${onlyFavorites ? 'fill-rose-400' : ''}`} />
              <span>Somente Favoritos</span>
            </button>
            <span className="text-slate-500 text-[11px]">
              Exibindo <strong>{filteredProducts.length}</strong> de {products.length} produtos
            </span>
          </div>

          {minOpportunityIndex > 0 && (
            <button
              onClick={() => setMinOpportunityIndex(0)}
              className="text-[11px] text-emerald-400 hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Products Display (Grid or List) */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center text-slate-400">
          <Flame className="h-10 w-10 mx-auto mb-3 text-slate-600" />
          <p className="font-display font-bold text-lg text-white">Nenhum produto encontrado</p>
          <p className="text-xs text-slate-400 mt-1">Tente ajustar os filtros ou a pontuação mínima do índice de oportunidade.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => {
            const isFav = product.isFavorite;
            return (
              <div
                key={product.id}
                className="group rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between overflow-hidden shadow-lg"
              >
                <div>
                  {/* Image container */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="cursor-pointer relative aspect-square overflow-hidden bg-slate-950 border-b border-slate-850"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      <span className={`rounded-lg px-2 py-0.5 text-[10px] font-black shadow-md ${getOpportunityBadge(product.opportunityIndex)}`}>
                        Índice: {product.opportunityIndex}/100
                      </span>
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`absolute top-2.5 right-2.5 rounded-full p-2 backdrop-blur-md transition-colors ${
                        isFav ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-950/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Content Info */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                      <span className="text-indigo-400">{product.platformName}</span>
                      <span>{product.category}</span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="cursor-pointer font-display font-bold text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight"
                    >
                      {product.name}
                    </h3>

                    {/* Price and commission info */}
                    <div className="pt-2 border-t border-slate-850 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Preço Oficial:</span>
                        <span className="text-xs font-bold text-slate-300">
                          {formatCurrency(product.price, product.currency)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-400 font-semibold block">Sua Comissão:</span>
                        <span className="font-display text-base font-black text-emerald-400">
                          {formatCurrency(product.commission, product.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="rounded-xl border border-slate-800 bg-slate-950 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    Detalhes
                  </button>
                  <button
                    onClick={() => onOpenCampaignModal(product)}
                    className="rounded-xl bg-emerald-500 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                  >
                    Campanha
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="p-4">Produto</th>
                <th className="p-4">Plataforma</th>
                <th className="p-4">Índice</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Comissão</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-slate-850/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 rounded-lg object-cover bg-slate-950"
                      />
                      <div>
                        <p className="font-bold text-white max-w-xs truncate">{product.name}</p>
                        <span className="text-[10px] text-slate-400">{product.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 font-semibold">{product.platformName}</td>
                  <td className="p-4">
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${getOpportunityBadge(product.opportunityIndex)}`}>
                      {product.opportunityIndex}/100
                    </span>
                  </td>
                  <td className="p-4 font-mono font-medium text-slate-300">
                    {formatCurrency(product.price, product.currency)}
                  </td>
                  <td className="p-4 font-mono font-extrabold text-emerald-400">
                    {formatCurrency(product.commission, product.currency)}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => onOpenCampaignModal(product)}
                      className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                    >
                      Campanha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
