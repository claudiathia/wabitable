import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { TIER_PRICING } from '../data/recipes';
import {
  ConfirmedOrder,
  SubscriptionPlanState,
  SubscriptionTier,
  UserProfile,
} from '../types/wabi';
import { CheckoutModal } from './CheckoutModal';

interface PlansPageProps {
  plan: SubscriptionPlanState;
  profile: UserProfile;
  confirmedOrder: ConfirmedOrder | null;
  onUpdatePlan: (next: SubscriptionPlanState) => void;
  onSubmitOrder: (order: ConfirmedOrder) => void;
  onResetOrder: () => void;
  onBackHome: (targetSection?: string) => void;
}

const BASE_PERKS = [
  'Everyday local recipes including Hainanese Chicken Rice',
  'UglyFood rescued local greens & fruit (save 25–35%)',
  'Full protein, grain & allergy customisation included',
  'Pre-portioned sauces — cook at home in 18–22 mins',
  'Pause, skip, or cancel anytime',
];

const PREMIUM_PERKS = [
  'Celebrity chef-curated menus by Chef Gordon Ramsay',
  'Signature elevated dishes including Spiny Lobster Laksa',
  'UglyFood rescued heirloom produce & micro herbs',
  'Full protein, grain & allergy customisation included',
  'Priority chilled islandwide delivery windows',
];

export const PlansPage: React.FC<PlansPageProps> = ({
  plan,
  profile,
  confirmedOrder,
  onUpdatePlan,
  onSubmitOrder,
  onResetOrder,
  onBackHome,
}) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleChoosePackage = (tier: SubscriptionTier, days: 14 | 30) => {
    onUpdatePlan({
      ...plan,
      tier,
      packageDays: days,
    });
    setCheckoutOpen(true);
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-10 sm:py-14 flex flex-col justify-center">
      {/* Blurred Culinary Background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="grid grid-cols-2 h-full w-full scale-110 blur-xl opacity-55">
          <img
            src="/src/assets/images/dish_chicken_rice_1795159607214.jpg"
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <img
            src="/src/assets/images/dish_lobster_laksa_1795159608695.jpg"
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FEF5ED]/85 via-[#FDE3CF]/70 to-[#FEF5ED]/90 backdrop-blur-md" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-8">
        {/* Top Row: Back & Weekly Menu Links */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => onBackHome('top')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#632713] bg-white/85 hover:bg-white px-3.5 py-2 rounded-xl border border-[#632713]/15 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <button
            type="button"
            onClick={() => onBackHome('menus')}
            className="text-xs font-semibold text-[#EC6426] hover:underline underline-offset-4 cursor-pointer"
          >
            Browse Weekly Menu →
          </button>
        </div>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold text-[#EC6426] mb-2">
            Plan Tiers
          </p>
          <h1
            className="font-[Outfit] text-3xl sm:text-5xl font-bold text-[#632713] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Choose your tier and package length
          </h1>
          <p className="text-sm sm:text-base text-[#632713]/80 mt-3">
            Both Base and Premium tiers come in 14-day and 30-day packages with full ingredient customisation.
          </p>
        </div>

        {/* ONLY Two Frosted Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto items-stretch">
          {/* Card 1: Base Tier — Chicken Rice Background */}
          <div className="rounded-[30px] p-2.5 bg-white/75 backdrop-blur-md shadow-xl border border-white/85 flex flex-col">
            {/* Background Food Canvas: Hainanese Chicken Rice (No price text over image) */}
            <div className="relative rounded-[22px] overflow-hidden min-h-[280px] flex flex-col justify-start p-6 sm:p-7 text-white">
              <img
                src="/src/assets/images/dish_chicken_rice_1795159607214.jpg"
                alt="Hainanese Chicken Rice featured in the Base Tier"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#632713]/80 via-[#632713]/40 to-transparent"
              />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#FDE3CF]">
                    Base Tier
                  </p>
                  <h2 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-white mt-0.5">
                    {TIER_PRICING.base.name}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#632713] bg-[#FDE3CF] px-3 py-1 rounded-lg whitespace-nowrap shrink-0">
                  Chicken Rice &amp; Local Fare
                </span>
              </div>
            </div>

            {/* Lower Checklist & 14-Day / 30-Day Price Buttons */}
            <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 bg-white/95 rounded-[22px] mt-2.5">
              <ul className="space-y-2.5 text-sm text-[#632713] mb-6">
                {BASE_PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EC6426] shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChoosePackage('base', 14)}
                  className="py-3.5 px-3 rounded-xl text-sm font-bold text-[#632713] bg-[#FDE3CF] hover:bg-[#F8A91F]/60 transition-colors font-mono tabular-nums whitespace-nowrap cursor-pointer"
                >
                  14 Days · $138.60
                </button>
                <button
                  type="button"
                  onClick={() => handleChoosePackage('base', 30)}
                  className="py-3.5 px-3 rounded-xl text-sm font-bold text-white bg-[#632713] hover:bg-[#4c1d0e] transition-colors font-mono tabular-nums whitespace-nowrap cursor-pointer"
                >
                  30 Days · $297.00
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Premium Tier — Lobster Laksa Background */}
          <div className="rounded-[30px] p-2.5 bg-white/80 backdrop-blur-md shadow-xl border border-[#EC6426]/45 flex flex-col">
            {/* Background Food Canvas: Lobster Laksa (No price text over image) */}
            <div className="relative rounded-[22px] overflow-hidden min-h-[280px] flex flex-col justify-start p-6 sm:p-7 text-white">
              <img
                src="/src/assets/images/dish_lobster_laksa_1795159608695.jpg"
                alt="Char-Grilled Spiny Lobster Laksa featured in the Premium Tier"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#632713]/80 via-[#632713]/40 to-transparent"
              />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#F8A91F]">
                    Premium Tier
                  </p>
                  <h2 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-white mt-0.5">
                    {TIER_PRICING.premium.name}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#632713] bg-[#F8A91F] px-3 py-1 rounded-lg whitespace-nowrap shrink-0">
                  Lobster Laksa &amp; Chef Menus
                </span>
              </div>
            </div>

            {/* Lower Checklist & 14-Day / 30-Day Price Buttons */}
            <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 bg-white/95 rounded-[22px] mt-2.5">
              <ul className="space-y-2.5 text-sm text-[#632713] mb-6">
                {PREMIUM_PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EC6426] shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChoosePackage('premium', 14)}
                  className="py-3.5 px-3 rounded-xl text-sm font-bold text-[#632713] bg-[#FDE3CF] hover:bg-[#F8A91F]/60 transition-colors font-mono tabular-nums whitespace-nowrap cursor-pointer"
                >
                  14 Days · $278.60
                </button>
                <button
                  type="button"
                  onClick={() => handleChoosePackage('premium', 30)}
                  className="py-3.5 px-3 rounded-xl text-sm font-bold text-white bg-[#EC6426] hover:bg-[#d5531a] transition-colors font-mono tabular-nums whitespace-nowrap cursor-pointer"
                >
                  30 Days · $597.00
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        plan={plan}
        profile={profile}
        confirmedOrder={confirmedOrder}
        onUpdatePlan={onUpdatePlan}
        onSubmitOrder={onSubmitOrder}
        onResetOrder={onResetOrder}
        onClose={() => setCheckoutOpen(false)}
      />
    </section>
  );
};
