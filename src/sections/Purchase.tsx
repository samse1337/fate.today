import { useEffect, useRef, useState } from 'react';
import { Check, Copy, X, Zap, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface QQAgent {
  qq: string;
  note: string;
}

const qqAgents: QQAgent[] = [
  { qq: '896444691', note: '工作日仅8点后在线' },
  { qq: '3563852479', note: '全天候在线' },
];

const qqAgentsEn: QQAgent[] = [
  { qq: '896444691', note: 'Online after 8PM on weekdays only' },
  { qq: '3563852479', note: 'Available 24/7' },
];

export default function Purchase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [copiedQQ, setCopiedQQ] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.purchase-animate');
            elements.forEach((el, index) => {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  el.classList.add('animate-fade-in-up');
                }, index * 60);
              });
            });
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px 0px 0px 0px' }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleCopyQQ = (qq: string) => {
    navigator.clipboard.writeText(qq);
    setCopiedQQ(qq);
    setTimeout(() => setCopiedQQ(null), 2000);
  };

  const handleOpenModal = () => {
    setIsClosing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 400);
  };

  const agents = language === 'zh' ? qqAgents : qqAgentsEn;

  const plans = [
    {
      name: t('purchase.day'),
      price: '5',
      period: t('purchase.dayUnit'),
      popular: false,
      isShortTerm: true,
    },
    {
      name: t('purchase.week'),
      price: '15',
      period: t('purchase.weekUnit'),
      popular: false,
      isShortTerm: true,
    },
    {
      name: t('purchase.month'),
      price: '35',
      period: t('purchase.monthUnit'),
      popular: true,
      isShortTerm: true,
    },
    {
      name: t('purchase.quarter'),
      price: '80',
      period: t('purchase.quarterUnit'),
      popular: false,
      isShopLink: true,
    },
    {
      name: t('purchase.forever'),
      price: '150',
      period: t('purchase.foreverUnit'),
      popular: false,
      isShopLink: true,
      isForever: true,
      features: [
        t('purchase.foreverFeature1'),
        t('purchase.foreverFeature2'),
        t('purchase.foreverFeature3'),
      ],
    },
    {
      name: t('purchase.beta'),
      price: '500',
      period: t('purchase.foreverUnit'),
      isBeta: true,
      isShopLink: true,
      features: [
        t('purchase.betaFeature1'),
        t('purchase.betaFeature2'),
        t('purchase.betaFeature3'),
      ],
      popular: false,
    },
  ];

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (plan.isShortTerm) {
      handleOpenModal();
    } else if (plan.isShopLink) {
      window.open('https://shop.canye.top/item/24', '_blank');
    }
  };

  return (
    <>
      <section
        id="purchase"
        ref={sectionRef}
        className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden w-full"
      >
        {/* 区块衔接渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/15 to-transparent pointer-events-none" />
        
        {/* 局部光晕 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[150px]" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-blue-800/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Section header */}
          <div className="text-center mb-10 sm:mb-16 px-4">
            <h2 className="opal-title text-2xl sm:text-4xl lg:text-5xl tracking-tight mb-3 sm:mb-4">
              {t('purchase.title')}
            </h2>
            <p className="opal-subtitle text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              {t('purchase.subtitle')}
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 mb-12 sm:mb-16 px-2 sm:px-0">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`purchase-animate animate-initial pricing-card relative rounded-2xl p-4 sm:p-5 flex flex-col ${
                  plan.popular
                    ? 'bg-blue-600/25 border-2 border-blue-400/60'
                    : plan.isBeta
                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-400/50'
                    : 'bg-blue-950/30 border border-blue-400/25'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {t('purchase.popular')}
                    </span>
                  </div>
                )}

                {/* Beta badge */}
                {plan.isBeta && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="beta-badge">BETA</span>
                  </div>
                )}

                <div className="text-center flex-1 flex flex-col">
                  <h3 className={`text-sm font-semibold mb-2 ${plan.isBeta ? 'text-amber-300' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-0.5 mb-1">
                    <span className="text-blue-300 text-xs">¥</span>
                    <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${plan.isBeta ? 'text-amber-300' : 'text-white'}`}>
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-blue-300/60 text-xs mb-3">/{plan.period}</span>

                  {/* 短期订阅提示 */}
                  {plan.isShortTerm && (
                    <div className="mt-auto pt-2">
                      <p className="text-blue-200/60 text-[10px] leading-tight">
                        {t('purchase.agentNote')}
                      </p>
                    </div>
                  )}

                  {/* Beta专属功能介绍 */}
                  {plan.isBeta && plan.features && (
                    <div className="mt-auto pt-3 border-t border-amber-400/20">
                      <div className="flex items-center gap-1 mb-1.5">
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-300 text-[10px] font-semibold">{t('purchase.betaFeatures')}</span>
                      </div>
                      <ul className="space-y-1">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-1">
                            <Check className="w-2.5 h-2.5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span className="text-amber-100/70 text-[9px] leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 永久订阅专属介绍 */}
                  {plan.isForever && plan.features && (
                    <div className="mt-auto pt-3 border-t border-blue-400/20">
                      <ul className="space-y-1">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-1">
                            <Check className="w-2.5 h-2.5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span className="text-blue-100/70 text-[9px] leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!plan.isBeta && !plan.isForever && !plan.isShortTerm && <div className="flex-1" />}

                  <button
                    onClick={() => handlePlanClick(plan)}
                    className={`block w-full text-center py-2 mt-3 rounded-full text-xs font-medium transition-all ${
                      plan.isShortTerm
                        ? 'bg-blue-500/20 border border-blue-400/40 text-blue-200 hover:bg-blue-500/30'
                        : plan.popular
                        ? 'bg-white text-black hover:bg-white/90'
                        : plan.isBeta
                        ? 'bg-amber-500 text-black hover:bg-amber-400'
                        : 'bg-blue-500/15 border border-blue-400/30 text-white hover:bg-blue-500/25'
                    }`}
                  >
                    {plan.isShortTerm ? t('purchase.copy') : t('purchase.select')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QQ Agents Modal */}
      {showModal && (
        <div 
          className={`modal-overlay ${isClosing ? 'closing' : ''}`} 
          onClick={handleCloseModal}
        >
          <div className={`modal-content ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                {t('purchase.addAgentQQ')}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-white/60 text-sm mb-4">
              {t('purchase.chooseAgent')}
            </p>

            <div className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.qq}
                  className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="text-white font-mono text-lg font-semibold">
                      {agent.qq}
                    </div>
                    <div className="text-blue-300/70 text-xs mt-0.5">
                      {agent.note}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyQQ(agent.qq)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-blue-200 text-sm transition-colors"
                  >
                    {copiedQQ === agent.qq ? (
                      <>
                        <Check className="w-4 h-4" />
                        {t('purchase.copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {t('purchase.copy')}
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleCloseModal}
              className="w-full mt-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-white text-sm transition-colors"
            >
              {t('purchase.close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
