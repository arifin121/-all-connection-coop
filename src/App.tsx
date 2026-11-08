/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  FileText,
  Globe2,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  Printer,
  Scale,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';

interface DocumentInfo {
  id: 'regulation' | 'feetable';
  title: string;
  filename: string;
  updatedDate: string;
  summary: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

const PUBLIC_DOCUMENTS: Record<'regulation' | 'feetable', DocumentInfo> = {
  regulation: {
    id: 'regulation',
    title: '監理団体の業務の運営に関する規程',
    filename: '監理団体の業務の運営に関する規程_オールコネクション協同組合.txt',
    updatedDate: '2023年9月22日 改定',
    summary:
      '外国人の技能実習の適正な実施及び技能実習生の保護に関する法律（技能実習法）第25条に基づき、オールコネクション協同組合における監理事業の適正な運営規程を公表いたします。',
    sections: [
      {
        heading: '第1条（目的及び基本方針）',
        content: [
          '本規程は、オールコネクション協同組合（以下「当組合」という。）が実施する特定監理事業に関し、技能実習法その他の関係法令を遵守し、適正かつ円滑な技能実習の運営と技能実習生の保護を図ることを目的とする。',
        ],
      },
      {
        heading: '第2条（団体監理型技能実習の取扱職種）',
        content: [
          '当組合が取り扱う職種及び作業は、主務省令で定める移行対象職種・作業ならびに受入れ企業の実態に即した製造業、建設業、農業、介護等の各職種とする。',
        ],
      },
      {
        heading: '第3条（監査及び訪問指導の実施体制）',
        content: [
          '1. 監理責任者の指揮の下、少なくとも3ヶ月に1回以上、実習実施者に対する定期監査を実施し、主務大臣へ報告する。',
          '2. 第1号技能実習生については、入国後1ヶ月間の法定講習を確実に実施するとともに、配属後1ヶ月以内に訪問指導を行う。',
        ],
      },
      {
        heading: '第4条（相談体制及び母国語支援）',
        content: [
          '技能実習生からの生活上・実習上の相談に迅速に対応するため、母国語対応スタッフを配置し、専用相談窓口（TEL: 06-6654-8845 / Email: info@all-connection.jp）を常設する。',
        ],
      },
    ],
  },
  feetable: {
    id: 'feetable',
    title: '別表管理費表',
    filename: '別表管理費表_オールコネクション協同組合.txt',
    updatedDate: '2023年9月22日 改定',
    summary:
      '技能実習法第28条に基づき、当組合が受入れ企業（実習実施者）様より徴収する監理費の項目・内訳及び算定基準を明示いたします。技能実習生本人から直接又は間接に監理費を徴収することは一切ありません。',
    sections: [
      {
        heading: '1. 職業紹介費（実費相当額）',
        content: [
          '・現地送出機関との連絡調整、求人票作成、現地面接・オンライン面接手配にかかる実費',
          '・選抜決定後の在留資格認定証明書交付申請書類の作成・翻訳・申請取次実費',
        ],
      },
      {
        heading: '2. 講習費（入国後約1ヶ月間）',
        content: [
          '・日本語教育、日本での生活一般に関する知識、法的保護に必要な講義費用',
          '・講習期間中の宿泊施設費、教材費、および講習手当（実費精算）',
        ],
      },
      {
        heading: '3. 監査指導費・その他諸経費（月額監理費）',
        content: [
          '・定期巡回指導（月1回以上の訪問）、3ヶ月に1回の法定監査実施費用',
          '・母国語スタッフによる通訳・翻訳サポート、生活相談・緊急時同行支援費用',
          '※受入れ人数・職種・地域に応じた詳細見積書を事前のご契約前に書面にて提示いたします。',
        ],
      },
    ],
  },
};

const INSTAGRAM_URL =
  'https://www.instagram.com/allconnectioncoop?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw==';

const INSTAGRAM_POSTS = [
  {
    id: 'post-1',
    image: 'images/activities/activity-01.jpg',
    caption:
      '教習所での特別教育修了証取得サポート。現場で即戦力となる資格取得をバックアップしています。',
    tag: '資格取得支援',
  },
  {
    id: 'post-2',
    image: 'images/activities/activity-02.jpg',
    caption:
      '現地送り出し機関との緊密な連携により、意欲と基礎力を備えた優秀な人材を育成・選抜しています。',
    tag: '現地教育・連携',
  },
  {
    id: 'post-3',
    image: 'images/activities/activity-03.jpg',
    caption:
      '現地トレーニングセンター・研修施設の定期視察および現地スタッフとの運営ミーティング風景。',
    tag: '現地視察・連携',
  },
  {
    id: 'post-4',
    image: 'images/activities/activity-04.jpg',
    caption:
      '日本入国時の空港出迎え・移動同行サポート。初めての日本生活も安心してスタートできるよう支援します。',
    tag: '入国・送迎サポート',
  },
  {
    id: 'post-5',
    image: 'images/activities/activity-05.jpg',
    caption:
      '日本語能力試験（JLPT N3・N4）合格に向けた学習支援。配属後も継続的なスキルアップを応援します。',
    tag: '日本語学習支援',
  },
  {
    id: 'post-7',
    image: 'images/activities/activity-06.jpg',
    caption:
      '受入れ企業様への配属移動同行サポート。新大阪駅から全国の配属先へ責任を持ってお送りします。',
    tag: '配属同行サポート',
  },
  {
    id: 'post-8',
    image: 'images/activities/activity-07.jpg',
    caption:
      '受入れ企業様での製造・縫製実習の様子。定期巡回・監査を通じて実習生と企業様の双方をフォローします。',
    tag: '現場巡回・フォロー',
  },
  {
    id: 'post-9',
    image: 'images/activities/activity-08.jpg',
    caption:
      '市役所・区役所での転入届や各種行政手続きも、母国語スタッフが同行してきめ細かくサポートします。',
    tag: '生活・行政手続き支援',
  },
  {
    id: 'post-10',
    image: 'images/activities/activity-09.jpg',
    caption:
      '建設機械施工技能実習評価試験（初級）合格証書の授与。確かな技術習得とキャリア形成を支援します。',
    tag: '技能検定・合格支援',
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDocModal, setActiveDocModal] = useState<DocumentInfo | null>(null);
  const [logoError, setLogoError] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);
  const [activeIgIndex, setActiveIgIndex] = useState(0);

  // Contact form state
  const [formData, setFormData] = useState({
    companyName: '',
    personInCharge: '',
    email: '',
    phone: '',
    inquiryType: '技能実習生の受入れについて',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Auto-rotate Instagram post showcase every 5 seconds
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIgIndex((prev) => (prev + 1) % INSTAGRAM_POSTS.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  // Intersection Observer for smooth fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadDocument = (doc: DocumentInfo) => {
    const lines: string[] = [
      '====================================================================',
      `  ${doc.title}`,
      '  オールコネクション協同組合 (ALL CONNECTION COOPERATIVE)',
      `  最終改定: ${doc.updatedDate}`,
      '====================================================================',
      '',
      doc.summary,
      '',
      ...doc.sections.flatMap((sec) => [
        `■ ${sec.heading}`,
        ...sec.content.map((c) => `  ${c}`),
        '',
      ]),
      '--------------------------------------------------------------------',
      '発行元: オールコネクション協同組合',
      '所在地: 〒559-0013 大阪府大阪市住之江区御崎6-1-3 タカラビル405',
      '種別: 特定監理事業 | 登録支援機関（23登-008878）',
      'TEL: 06-6654-8845 / Email: info@all-connection.jp',
    ];

    const blob = new Blob([lines.join('\n')], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.companyName.trim()) {
      errors.companyName = '会社名を入力してください。';
    }
    if (!formData.personInCharge.trim()) {
      errors.personInCharge = 'ご担当者名を入力してください。';
    }
    if (!formData.email.trim()) {
      errors.email = 'メールアドレスを入力してください。';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = '有効なメールアドレス形式で入力してください。';
    }
    if (!formData.phone.trim()) {
      errors.phone = '電話番号を入力してください。';
    } else if (!/^[0-9+\-()\s]{9,16}$/.test(formData.phone.trim())) {
      errors.phone = '有効な電話番号を入力してください（例: 06-6654-8845）。';
    }
    if (!formData.message.trim()) {
      errors.message = 'お問い合わせ内容を入力してください。';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `【お問い合わせ】${formData.inquiryType}（${formData.companyName}）`
    );
    const body = encodeURIComponent(
      [
        'オールコネクション協同組合 担当者様',
        '',
        'Webサイトのお問い合わせフォームより連絡いたします。',
        '',
        `■ 貴社名・法人名：${formData.companyName}`,
        `■ ご担当者名：${formData.personInCharge}`,
        `■ メールアドレス：${formData.email}`,
        `■ 電話番号：${formData.phone}`,
        `■ お問い合わせ種別：${formData.inquiryType}`,
        '',
        '■ お問い合わせ内容：',
        formData.message,
      ].join('\n')
    );
    return `mailto:info@all-connection.jp?subject=${subject}&body=${body}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    let sentByServer = false;
    try {
      const response = await fetch('send-mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'info@all-connection.jp',
          ...formData,
        }),
      });
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const result = await response.json();
        if (result && result.ok) {
          sentByServer = true;
        }
      }
    } catch {
      sentByServer = false;
    }

    if (!sentByServer) {
      const link = document.createElement('a');
      link.href = buildMailtoHref();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F2537] font-sans">
      {/* 1. HEADER (Sticky Navigation - 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 h-16 md:h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Lockup */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, 'top')}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-[#117878] rounded-md"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-[#117878]/20 bg-[#f7f9fa] flex items-center justify-center shrink-0">
              {!logoError ? (
                <img
                  src="images/brand/acc-logo.png"
                  alt="オールコネクション協同組合 ロゴ"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-xs font-bold text-[#117878]">ACC</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold tracking-tight text-[#0F2537] group-hover:text-[#117878] transition-colors leading-snug">
                オールコネクション協同組合
              </span>
              <span className="text-[10px] md:text-[11px] font-semibold tracking-wider text-[#117878] leading-none mt-0.5">
                ALL CONNECTION COOPERATIVE
              </span>
            </div>
          </a>

          {/* Zone 2: Center Navigation Links */}
          <nav
            aria-label="メインナビゲーション"
            className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700"
          >
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="py-1 hover:text-[#117878] border-b-2 border-transparent hover:border-[#117878] transition-colors whitespace-nowrap shrink-0"
            >
              私たちについて
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="py-1 hover:text-[#117878] border-b-2 border-transparent hover:border-[#117878] transition-colors whitespace-nowrap shrink-0"
            >
              事業内容
            </a>
            <a
              href="#profile"
              onClick={(e) => handleNavClick(e, 'profile')}
              className="py-1 hover:text-[#117878] border-b-2 border-transparent hover:border-[#117878] transition-colors whitespace-nowrap shrink-0"
            >
              組合概要
            </a>
            <a
              href="#rules"
              onClick={(e) => handleNavClick(e, 'rules')}
              className="py-1 hover:text-[#117878] border-b-2 border-transparent hover:border-[#117878] transition-colors whitespace-nowrap shrink-0"
            >
              運営規則
            </a>
          </nav>

          {/* Zone 3: Primary CTA Button & Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-[#117878] hover:bg-[#0d5e5e] active:bg-[#0a4b4b] rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#117878]"
            >
              お問い合わせ →
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#0F2537] hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#117878]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-lg px-4 pt-3 pb-5 space-y-2">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#0F2537] hover:bg-[#f7f9fa] hover:text-[#117878]"
            >
              私たちについて
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#0F2537] hover:bg-[#f7f9fa] hover:text-[#117878]"
            >
              事業内容
            </a>
            <a
              href="#profile"
              onClick={(e) => handleNavClick(e, 'profile')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#0F2537] hover:bg-[#f7f9fa] hover:text-[#117878]"
            >
              組合概要
            </a>
            <a
              href="#rules"
              onClick={(e) => handleNavClick(e, 'rules')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#0F2537] hover:bg-[#f7f9fa] hover:text-[#117878]"
            >
              運営規則
            </a>
            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-bold text-white bg-[#117878] hover:bg-[#0d5e5e] rounded-lg transition-colors whitespace-nowrap"
              >
                お問い合わせ →
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative overflow-hidden bg-[#0B2330] text-white">
          {/* Background image with measured high-contrast scrim */}
          <div className="absolute inset-0 z-0">
            {!heroImgError ? (
              <img
                src="images/hero/hero-banner.jpg"
                alt="オールコネクション協同組合 介護・建設・オフィス・食品製造など多様な現場でのサポート"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0B2330] via-[#117878] to-[#0F2537]" />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#091E2A]/35 via-[#0B2634]/30 to-[#091E2A]/50"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-36 text-center">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#FFE08A] drop-shadow-sm mb-4">
              外国人技能実習・特定技能 特定監理事業 ／ 登録支援機関（23登-008878）
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-5 drop-shadow-md">
              未来を築く、世界と繋がる
            </h1>
            <p className="text-sm sm:text-base font-medium text-white max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              大阪を拠点に、徹底した法令遵守と多言語サポート体制で受入れ企業様と外国人材を繋ぐ確かな架け橋。申請手続きから入国後講習・配属後の定期フォローまで一貫して支援いたします。
            </p>
          </div>

          {/* Quantitative & Institutional Proof Bar */}
          <div className="relative z-10 border-t border-white/15 bg-[#081A24]/90 backdrop-blur-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div className="border-white/10">
                <div className="text-xs text-slate-300">設立・監理事業許可</div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums mt-0.5">
                  2021年9月3日 許可
                </div>
                <div className="text-xs text-[#E5B869] mt-0.5">特定監理事業 認定組合</div>
              </div>
              <div>
                <div className="text-xs text-slate-300">登録支援機関番号</div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums mt-0.5">
                  23登-008878
                </div>
                <div className="text-xs text-[#E5B869] mt-0.5">2023年9月22日 登録完了</div>
              </div>
              <div>
                <div className="text-xs text-slate-300">技能実習・特定技能</div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums mt-0.5">
                  最長5年 ／ 16分野
                </div>
                <div className="text-xs text-[#E5B869] mt-0.5">介護・製造・建設・農業ほか対応</div>
              </div>
              <div>
                <div className="text-xs text-slate-300">入国後法定講習・監査</div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums mt-0.5">
                  約1ヶ月講習・定期巡回
                </div>
                <div className="text-xs text-[#E5B869] mt-0.5">母国語スタッフ常駐サポート</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT (組合について) */}
        <section
          id="about"
          className="py-20 md:py-28 bg-white scroll-mt-20 reveal-section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              {/* Left Column: Text Content */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="text-xs font-bold tracking-widest text-[#117878] mb-3">
                  私たちについて
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F2537] tracking-tight leading-snug mb-6">
                  信頼と実績で、企業と実習生を繋ぐ架け橋に
                </h2>
                <div className="space-y-5 text-base text-slate-700 leading-relaxed">
                  <p>
                    オールコネクション協同組合は、長年にわたり技能実習生の受入れを支援してまいりました。法令遵守を徹底し、受入れ企業様と実習生一人ひとりに寄り添った、きめ細やかなサポートを提供することをお約束します。
                  </p>
                  <p>
                    私たちの使命は、単なる人材紹介ではありません。技術の移転、文化の交流を通じて、関わるすべての人々が共に成長できる環境を創造することです。
                  </p>
                </div>

                {/* Key Institutional Commitments */}
                <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-bold text-[#0F2537]">
                      法令遵守に基づく適正監理
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      技能実習法および入管法に則り、定期監査・訪問指導・書類管理を厳格に遂行します。
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F2537]">
                      受入れ企業様と実習生の双方向支援
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      配属前の入国後講習から配属後の生活・労務相談まで、母国語スタッフが伴走します。
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Instagram Post Showcase Card */}
              <div className="lg:col-span-5 flex">
                <div className="w-full rounded-2xl border border-slate-200 bg-[#f7f9fa] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Instagram Account Header */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 group"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-[#117878]/30 bg-white shrink-0 flex items-center justify-center">
                          {!logoError ? (
                            <img
                              src="images/brand/acc-logo.png"
                              alt="オールコネクション協同組合 アイコン"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-xs font-bold text-[#117878]">ACC</span>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#0F2537] group-hover:text-[#117878] transition-colors">
                            @allconnectioncoop
                          </div>
                          <div className="text-[11px] text-slate-500">
                            公式Instagram 活動紹介
                          </div>
                        </div>
                      </a>

                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#117878] hover:bg-[#0d5e5e] transition-colors whitespace-nowrap shrink-0"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                        <span>フォローする</span>
                      </a>
                    </div>

                    {/* Rotating Instagram Post Image (changes every 20 seconds) */}
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative rounded-xl overflow-hidden bg-[#0F2537] aspect-4/3 mb-4 group"
                    >
                      <img
                        key={INSTAGRAM_POSTS[activeIgIndex].id}
                        src={INSTAGRAM_POSTS[activeIgIndex].image}
                        alt={INSTAGRAM_POSTS[activeIgIndex].caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-[#0F2537]/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        {INSTAGRAM_POSTS[activeIgIndex].tag}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2537]/85 via-[#0F2537]/20 to-transparent flex items-end p-4 sm:p-5">
                        <p className="text-xs sm:text-sm font-medium text-white leading-snug">
                          {INSTAGRAM_POSTS[activeIgIndex].caption}
                        </p>
                      </div>
                    </a>

                    {/* Slide Indicators (10 posts, auto-advances every 20s) */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="flex items-center gap-1 flex-wrap">
                        {INSTAGRAM_POSTS.map((post, idx) => (
                          <button
                            key={post.id}
                            type="button"
                            onClick={() => setActiveIgIndex(idx)}
                            aria-label={`投稿 ${idx + 1} を表示`}
                            className={`h-1.5 rounded-full transition-all cursor-pointer ${
                              idx === activeIgIndex
                                ? 'w-6 bg-[#117878]'
                                : 'w-2 bg-slate-300 hover:bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#117878] hover:text-[#0d5e5e] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Instagramで投稿を見る</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-white shrink-0 flex items-center justify-center">
                      {!logoError ? (
                        <img
                          src="images/brand/acc-logo.png"
                          alt="オールコネクション協同組合 エンブレム"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-sm font-bold text-[#117878]">ACC</span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0F2537]">
                        オールコネクション協同組合
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        代表理事 中村 律子 · 特定監理事業 / 登録支援機関
                      </div>
                      <div className="text-xs text-[#117878] font-medium tabular-nums mt-0.5">
                        登録番号：23登-008878
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FEATURES / STRENGTHS (当組合の強み) */}
        <section
          id="strengths"
          className="py-20 md:py-24 bg-[#f7f9fa] border-y border-slate-200/80 reveal-section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2537] tracking-tight">
                当組合の強み
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                初めての外国人材受入れをご検討中の企業様にも安心してご活用いただける、3つのサポート基盤を整えています。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-8 transition-transform duration-200 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-[#117878]/10 text-[#117878] flex items-center justify-center">
                      <Scale className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F2537] mb-3">
                    徹底した法令遵守
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    技能実習法をはじめとする関連法規を遵守し、適正な実習の実施をサポートします。
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                  定期監査・訪問指導・適正な書類作成代行
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-8 transition-transform duration-200 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-[#117878]/10 text-[#117878] flex items-center justify-center">
                      <Globe2 className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F2537] mb-3">
                    多言語での万全なサポート
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    実習生の母国語に対応できるスタッフが常駐。生活や実習の悩みをいつでも相談できます。
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                  母国語による生活オリエンテーション・随時相談対応
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-8 transition-transform duration-200 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-[#117878]/10 text-[#117878] flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F2537] mb-3">
                    豊富な受入れ実績
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    製造業、建設業、農業など、多様な職種での豊富なマッチング実績があります。
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                  製造業 · 建設業 · 農業 · 介護職ほか幅広い職種に対応
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HR SERVICES (外国人人材について) */}
        <section
          id="services"
          className="py-20 md:py-28 bg-white scroll-mt-20 reveal-section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <div className="text-xs font-bold tracking-widest text-[#117878] mb-3">
                事業内容
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F2537] tracking-tight">
                外国人人材について
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                受入れ企業様の現場課題や人材育成計画に合わせ、「外国人技能実習制度」および「特定技能制度」の双方を適正にサポートいたします。
              </p>
            </div>

            {/* Subsections A & B */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Subsection A: 外国人技能実習 */}
              <div className="rounded-xl border border-slate-200 bg-white p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-end gap-4 mb-4">
                    <span className="text-xs text-slate-500 tabular-nums">
                      在留期間：最長5年間
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2537] mb-4">
                    外国人技能実習
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    外国人技能実習制度とは、開発途上国の人材育成を目的として、日本で培われた技能や技術を移転する制度です。最長5年間、技能実習生として日本で働きながら技能を習得し、母国での経済発展に貢献することが期待されます。
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span>第1号技能実習（1年目）</span>
                  <span aria-hidden="true">·</span>
                  <span>第2号技能実習（2〜3年目）</span>
                  <span aria-hidden="true">·</span>
                  <span>第3号技能実習（4〜5年目）</span>
                </div>
              </div>

              {/* Subsection B: 外国人特定技能 */}
              <div className="rounded-xl border border-slate-200 bg-white p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-end gap-4 mb-4">
                    <span className="text-xs text-slate-500 tabular-nums">
                      対象：特定産業分野（16分野）
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2537] mb-4">
                    外国人特定技能
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    「特定技能」とは、2019年4月に創設された、日本国内で人手不足が深刻とされている特定産業分野（16分野）において、即戦力となる外国人材の就労が可能になった在留資格です。
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span>登録支援機関（23登-008878）</span>
                  <span aria-hidden="true">·</span>
                  <span>即戦力人材の受入れ</span>
                  <span aria-hidden="true">·</span>
                  <span>義務的支援計画の実施</span>
                </div>
              </div>
            </div>

            {/* Highlight Box: 特定技能の介護も対応！ */}
            <div className="rounded-2xl border border-[#117878]/35 bg-[#f7f9fa] p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#117878] text-white flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#117878] tracking-wider">
                      介護分野の特定技能人材支援
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F2537]">
                      特定技能の介護も対応！
                    </h3>
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-600">
                  介護施設 · 病院 · 医療福祉現場での即戦力採用を支援
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8">
                当社も特定技能の介護職を支援しております。介護職人材は介護施設のみならず、病院などで活躍しております。特定技能「介護」の在留資格を持つ人材は、来日前に以下の2つの試験に合格しています。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="text-base sm:text-lg font-bold text-[#0F2537] mb-2">
                    1. 介護技能評価試験
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    介護の基本、利用者の心と体の仕組み、コミュニケーション技術、生活支援技術など、介護職として必要な専門知識と技能を証明します。
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="text-base sm:text-lg font-bold text-[#0F2537] mb-2">
                    2. 日本語能力試験
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    日常会話がある程度でき、業務に必要な「聞く・話す」能力（日本語能力試験N4レベル以上）をクリアしています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. MESSAGES (受入れをご検討の企業様へ & 日本で働きたい皆様へ) */}
        <section
          id="messages"
          className="py-20 md:py-24 bg-[#f7f9fa] border-y border-slate-200/80 reveal-section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Block A: 受入れをご検討の企業様へ */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0F2537] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#0F2537]">
                        受入れをご検討の企業様へ
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 mb-6">
                    <h3 className="text-base font-bold text-[#117878] mb-4">
                      技能実習生受入れのメリット
                    </h3>
                    <ul className="space-y-3">
                      {[
                        '職場の活性化と生産性の向上',
                        '国際的なネットワークの構築',
                        '企業の社会的責任(CSR)への貢献',
                        '将来的な海外展開の足がかり',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm sm:text-base text-[#0F2537] font-medium"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#117878] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-4 border-t border-slate-100">
                    私たちが申請書類の作成から入国後のフォローまで、一貫してサポートいたします。まずはお気軽にご相談ください。
                  </p>
                </div>

                <div className="mt-8">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#117878] hover:text-[#0d5e5e] transition-colors whitespace-nowrap"
                  >
                    <span>企業様向けのお問い合わせはこちら</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Block B: 日本で働きたい皆様へ */}
              <div className="bg-[#0F2537] text-white rounded-2xl border border-[#0F2537] p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#117878] text-white flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        日本で働きたい皆様へ
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 mb-6">
                    <h3 className="text-base font-bold text-[#E5B869] mb-4">
                      安心して日本で学び、働くために
                    </h3>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                      私たちは、皆さんが日本で安心して技術を学び、充実した生活を送れるよう全力でサポートします。日本の法律や文化、習慣についてもしっかりと研修を行います。困ったことがあれば、いつでも母国語で相談できるスタッフがいます。私たちと一緒に、日本での夢を実現しましょう。
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div>
                    <div className="font-bold text-white mb-0.5">入国後講習</div>
                    <div>日本の法律・生活習慣・日本語を丁寧に研修</div>
                  </div>
                  <div>
                    <div className="font-bold text-white mb-0.5">母国語相談窓口</div>
                    <div>生活や職場の悩みを母国語でいつでも相談可能</div>
                  </div>
                  <div>
                    <div className="font-bold text-white mb-0.5">キャリア支援</div>
                    <div>技能習得から特定技能へのステップアップも支援</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PROCESS TIMELINE (受入れの基本的な流れ) */}
        <section
          id="process"
          className="py-20 md:py-28 bg-white scroll-mt-20 reveal-section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <div className="text-xs font-bold tracking-widest text-[#117878] mb-3">
                受入れの流れ
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F2537] tracking-tight">
                受入れの基本的な流れ
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                初回のお打ち合わせから現地での面接、在留資格申請、入国後の法定講習を経て企業様へ配属されるまで、当組合が一貫して伴走いたします。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: 'ステップ 01',
                  title: 'ご相談・求人申込み',
                  description:
                    '受入れ要件やご希望をヒアリングし、最適なプランをご提案します。',
                  detail: '職種・人数・時期の確認及び受入れ計画の策定',
                },
                {
                  step: 'ステップ 02',
                  title: '現地での候補者選定・面接',
                  description:
                    '提携する送出し機関を通じて候補者を募集し、オンラインまたは現地で面接を実施します。',
                  detail: '適性試験・実技確認・個別面接の実施',
                },
                {
                  step: 'ステップ 03',
                  title: '各種申請手続き',
                  description:
                    '在留資格認定証明書交付申請など、複雑な書類作成を当組合が代行します。',
                  detail: '技能実習計画認定申請・入管申請書類の作成代行',
                },
                {
                  step: 'ステップ 04',
                  title: '入国後講習・企業配属',
                  description:
                    '約1ヶ月間の入国後講習を経て、各企業様へ配属。実習がスタートします。',
                  detail: '配属後も定期訪問・監査・母国語通訳で継続支援',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-xl border border-slate-200 bg-white p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-bold tracking-wider text-[#117878] tabular-nums">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F2537] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. COMPANY PROFILE (組合概要) */}
        <section
          id="profile"
          className="py-20 md:py-24 bg-white border-t border-slate-200/80 scroll-mt-20 reveal-section"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2537] tracking-tight">
                組合概要
              </h2>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-slate-200 text-sm sm:text-base">
                  {[
                    { label: '会社名', value: 'オールコネクション協同組合' },
                    { label: '代表者', value: '中村 律子' },
                    {
                      label: '本社所在地',
                      value:
                        '〒559-0013 大阪府大阪市住之江区御崎6-1-3 タカラビル405',
                    },
                    { label: '種別', value: '特定監理事業 | 登録支援機関' },
                    { label: '設立', value: '2021年4月8日' },
                    { label: '許可日', value: '2021年9月3日' },
                    { label: '登録支援機関登録番号', value: '23登-008878' },
                    { label: '登録日', value: '2023年9月22日' },
                  ].map((row, index) => (
                    <tr
                      key={row.label}
                      className={index % 2 === 0 ? 'bg-[#f7f9fa]' : 'bg-white'}
                    >
                      <th
                        scope="row"
                        className="w-1/3 sm:w-1/4 py-4 px-5 sm:px-6 font-bold text-[#0F2537] align-top border-r border-slate-200/70"
                      >
                        {row.label}
                      </th>
                      <td className="py-4 px-5 sm:px-6 text-slate-700 tabular-nums">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 9. DOWNLOADS (情報公開) */}
        <section
          id="rules"
          className="py-20 md:py-24 bg-[#f7f9fa] border-t border-slate-200 scroll-mt-20 reveal-section"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs font-bold tracking-widest text-[#117878] mb-3">
                情報公開
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2537] tracking-tight">
                運営規程及び管理費表
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                技能実習法令に基づき、当組合の業務運営規程および管理費表をインターネット上で公開しております。クリックして内容の閲覧およびダウンロードが可能です。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document 1 */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#117878]/10 text-[#117878] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 tabular-nums mb-1">
                      公表資料 01 · PDF / 規程文書
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F2537]">
                      監理団体の業務の運営に関する規程
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                  <a
                    href="docs/unei-kitei.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#117878] hover:bg-[#0d5e5e] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>規程を閲覧・印刷</span>
                  </a>
                </div>
              </div>

              {/* Document 2 */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#117878]/10 text-[#117878] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 tabular-nums mb-1">
                      公表資料 02 · PDF / 管理費基準
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F2537]">
                      別表管理費表
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                  <a
                    href="docs/kanrihi-hyo.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#117878] hover:bg-[#0d5e5e] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>管理費表を閲覧・印刷</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. CONTACT FOOTER (お気軽にご連絡ください) */}
      <footer
        id="contact"
        className="bg-[#0F2537] text-white border-t border-slate-800 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Side: Company Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="text-xs font-bold tracking-widest text-[#E5B869] mb-3">
                  お問い合わせ
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  お気軽にご連絡ください
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                  技能実習生・特定技能外国人材の受入れに関するご相談、資料請求、現地採用や介護職人材に関するご質問など、お電話またはフォームよりお気軽にお問い合わせください。
                </p>
              </div>

              <div className="space-y-5 pt-4 border-t border-white/15">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#E5B869] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-slate-400">本社所在地</div>
                    <div className="text-sm sm:text-base font-medium text-white mt-0.5">
                      〒559-0013 大阪府大阪市住之江区御崎6-1-3 タカラビル405
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#E5B869] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-slate-400">電話番号（平日 9:00〜18:00）</div>
                    <a
                      href="tel:06-6654-8845"
                      className="text-xl sm:text-2xl font-bold text-white hover:text-[#E5B869] transition-colors tabular-nums mt-0.5 inline-block"
                    >
                      06-6654-8845
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#E5B869] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-slate-400">メールアドレス</div>
                    <a
                      href="mailto:info@all-connection.jp"
                      className="text-sm sm:text-base font-medium text-white hover:text-[#E5B869] transition-colors mt-0.5 inline-block"
                    >
                      info@all-connection.jp
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Links Section */}
              <div className="pt-6 pb-2 border-t border-white/15 space-y-3">
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href="https://www.otit.go.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <img
                      src="images/banners/otit-logo.png"
                      alt="外国人技能実習機構 OTIT"
                      referrerPolicy="no-referrer"
                      className="h-12 w-auto object-contain bg-white rounded shadow-sm p-1.5"
                    />
                  </a>

                  <a
                    href="https://www.moj.go.jp/isa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <img
                      src="images/banners/isa-logo.png"
                      alt="出入国在留管理庁 ISA"
                      referrerPolicy="no-referrer"
                      className="h-12 w-auto object-contain bg-white rounded shadow-sm p-1.5"
                    />
                  </a>

                  <a
                    href="https://www.meti.go.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <img
                      src="images/banners/meti-logo.jpg"
                      alt="経済産業省 METI"
                      referrerPolicy="no-referrer"
                      className="h-12 w-auto object-contain bg-white rounded shadow-sm p-1.5"
                    />
                  </a>

                  <a
                    href="https://www.mlit.go.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <img
                      src="images/banners/mlit-logo.png"
                      alt="国土交通省 MLIT"
                      referrerPolicy="no-referrer"
                      className="h-12 w-auto object-contain bg-white rounded shadow-sm p-1.5"
                    />
                  </a>
                </div>
              </div>

              {/* Brand Identity Lockup in Footer */}
              <div className="pt-6 border-t border-white/15 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shrink-0 flex items-center justify-center">
                  {!logoError ? (
                    <img
                      src="images/brand/acc-logo.png"
                      alt="オールコネクション協同組合 ロゴ"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain rounded-full"
                    />
                  ) : (
                    <span className="text-xs font-bold text-[#117878]">ACC</span>
                  )}
                </div>
                <div>
                  <div className="text-base font-bold text-white">
                    オールコネクション協同組合
                  </div>
                  <div className="text-xs text-slate-400">
                    ALL CONNECTION COOPERATIVE · 登録支援機関 23登-008878
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Clean HTML Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white text-[#0F2537] rounded-2xl p-6 sm:p-10 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F2537] mb-2">
                  お問い合わせフォーム
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  以下の項目をご入力の上、「お問い合わせを送信する」ボタンを押してください。担当窓口（
                  <span className="font-semibold text-[#0F2537]">
                    info@all-connection.jp
                  </span>
                  ）へ送信され、担当者より折り返しご連絡いたします。
                </p>

                {formSubmitted ? (
                  <div className="rounded-xl border border-[#117878]/30 bg-[#f7f9fa] p-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#117878] text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0F2537]">
                      お問い合わせを受け付けました
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                      {formData.companyName} {formData.personInCharge} 様、お問い合わせいただきありがとうございます。
                      <span className="font-semibold text-[#0F2537]">
                        info@all-connection.jp
                      </span>{' '}
                      にて内容を確認の上、担当者よりご連絡いたします。
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={buildMailtoHref()}
                        className="px-5 py-2.5 text-sm font-bold text-[#117878] bg-white hover:bg-slate-50 border border-[#117878] rounded-lg transition-colors"
                      >
                        メールソフトで再送する
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            companyName: '',
                            personInCharge: '',
                            email: '',
                            phone: '',
                            inquiryType: '技能実習生の受入れについて',
                            message: '',
                          });
                        }}
                        className="px-5 py-2.5 text-sm font-bold text-white bg-[#117878] hover:bg-[#0d5e5e] rounded-lg transition-colors cursor-pointer"
                      >
                        新しいお問い合わせを送る
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-xs font-bold text-[#0F2537] mb-1.5"
                        >
                          貴社名・法人名 <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          required
                          placeholder="例：株式会社〇〇製作所"
                          value={formData.companyName}
                          onChange={(e) => {
                            setFormData({ ...formData, companyName: e.target.value });
                            if (formErrors.companyName) {
                              setFormErrors({ ...formErrors, companyName: '' });
                            }
                          }}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#117878] focus:outline-none focus:ring-2 focus:ring-[#117878]/20"
                        />
                        {formErrors.companyName && (
                          <p className="text-xs text-red-600 mt-1">
                            {formErrors.companyName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="personInCharge"
                          className="block text-xs font-bold text-[#0F2537] mb-1.5"
                        >
                          ご担当者名 <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="personInCharge"
                          name="personInCharge"
                          type="text"
                          required
                          placeholder="例：山田 太郎"
                          value={formData.personInCharge}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              personInCharge: e.target.value,
                            });
                            if (formErrors.personInCharge) {
                              setFormErrors({ ...formErrors, personInCharge: '' });
                            }
                          }}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#117878] focus:outline-none focus:ring-2 focus:ring-[#117878]/20"
                        />
                        {formErrors.personInCharge && (
                          <p className="text-xs text-red-600 mt-1">
                            {formErrors.personInCharge}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold text-[#0F2537] mb-1.5"
                        >
                          メールアドレス <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="info@example.co.jp"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) {
                              setFormErrors({ ...formErrors, email: '' });
                            }
                          }}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#117878] focus:outline-none focus:ring-2 focus:ring-[#117878]/20"
                        />
                        {formErrors.email && (
                          <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-bold text-[#0F2537] mb-1.5"
                        >
                          電話番号 <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="06-6654-8845"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone) {
                              setFormErrors({ ...formErrors, phone: '' });
                            }
                          }}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#117878] focus:outline-none focus:ring-2 focus:ring-[#117878]/20 tabular-nums"
                        />
                        {formErrors.phone && (
                          <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiryType"
                        className="block text-xs font-bold text-[#0F2537] mb-1.5"
                      >
                        お問い合わせ種別
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({ ...formData, inquiryType: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#117878] focus:outline-none focus:ring-2 focus:ring-[#117878]/20"
                      >
                        <option value="技能実習生の受入れについて">
                          技能実習生の受入れについて
                        </option>
                        <option value="特定技能人材（介護含む）の受入れについて">
                          特定技能人材（介護含む）の受入れについて
                        </option>
                        <option value="監理団体の変更・お見積りについて">
                          監理団体の変更・お見積りについて
                        </option>
                        <option value="その他のお問い合わせ">
                          その他のお問い合わせ
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold text-[#0F2537] mb-1.5"
                      >
                        お問い合わせ内容 <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="ご希望の職種、受入れ予定時期、ご質問内容などをご記入ください。"
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) {
                            setFormErrors({ ...formErrors, message: '' });
                          }
                        }}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#117878] focus:outline-none focus:ring-2 focus:ring-[#117878]/20"
                      />
                      {formErrors.message && (
                        <p className="text-xs text-red-600 mt-1">
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#117878] hover:bg-[#0d5e5e] active:bg-[#0a4b4b] rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <span>お問い合わせを送信する</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/10 bg-[#0A1926] py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} オールコネクション協同組合
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="hover:text-white transition-colors"
              >
                私たちについて
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className="hover:text-white transition-colors"
              >
                事業内容
              </a>
              <a
                href="#profile"
                onClick={(e) => handleNavClick(e, 'profile')}
                className="hover:text-white transition-colors"
              >
                組合概要
              </a>
              <a
                href="#rules"
                onClick={(e) => handleNavClick(e, 'rules')}
                className="hover:text-white transition-colors"
              >
                運営規則
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* PUBLIC DISCLOSURE DOCUMENT VIEWER MODAL */}
      {activeDocModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-doc-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs"
          onClick={() => setActiveDocModal(null)}
        >
          <div
            className="bg-white text-[#0F2537] rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-[#f7f9fa]">
              <div>
                <div className="text-xs font-bold text-[#117878]">
                  オールコネクション協同組合 情報公開資料 · {activeDocModal.updatedDate}
                </div>
                <h3 id="modal-doc-title" className="text-lg font-bold text-[#0F2537]">
                  {activeDocModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDocModal(null)}
                aria-label="閉じる"
                className="w-9 h-9 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed text-slate-700">
              <p className="p-4 rounded-xl bg-[#f7f9fa] border border-slate-200 text-xs sm:text-sm text-slate-700">
                {activeDocModal.summary}
              </p>

              {activeDocModal.sections.map((section) => (
                <div key={section.heading} className="space-y-2">
                  <h4 className="font-bold text-[#0F2537] text-sm sm:text-base">
                    {section.heading}
                  </h4>
                  <div className="space-y-1.5 text-slate-600 text-sm">
                    {section.content.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1 tabular-nums">
                <div>発行：オールコネクション協同組合（代表理事 中村 律子）</div>
                <div>所在地：〒559-0013 大阪府大阪市住之江区御崎6-1-3 タカラビル405</div>
                <div>許可区分：特定監理事業 ／ 登録支援機関（23登-008878）</div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-[#f7f9fa] flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>印刷する</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownloadDocument(activeDocModal)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#117878] hover:bg-[#0d5e5e] rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>ファイルをダウンロード</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
