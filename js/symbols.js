// ==========================================================================
// 수식 기호 팔레트 및 빈출 공식 프리셋 정의
// ==========================================================================
const LatexData = (function () {
  const PRESETS = [
    {
      id: "quadratic",
      name: "근의 공식",
      code: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
    },
    {
      id: "pythagoras",
      name: "피타고라스 정리",
      code: "a^2 + b^2 = c^2"
    },
    {
      id: "demoivre",
      name: "드무아브르 정리",
      code: "(\\cos \\theta + i \\sin \\theta)^n = \\cos(n\\theta) + i \\sin(n\\theta)"
    },
    {
      id: "euler_poly",
      name: "오일러 다면체 정리",
      code: "V - E + F = 2"
    },
    {
      id: "trig_sum",
      name: "삼각함수 덧셈정리",
      code: "\\sin(\\alpha \\pm \\beta) = \\sin \\alpha \\cos \\beta \\pm \\cos \\alpha \\sin \\beta"
    },
    {
      id: "heron",
      name: "헤론의 공식",
      code: "S = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad s = \\frac{a+b+c}{2}"
    },
    {
      id: "gaussian",
      name: "가우스 적분",
      code: "\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"
    },
    {
      id: "euler",
      name: "오일러 등식",
      code: "e^{i\\pi} + 1 = 0"
    },
    {
      id: "taylor",
      name: "테일러 급수",
      code: "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n"
    },
    {
      id: "fourier",
      name: "푸리에 변환",
      code: "\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x \\xi} dx"
    },
    {
      id: "calc_ftc",
      name: "미적분학 기본정리",
      code: "\\frac{d}{dx} \\int_{a}^{x} f(t) dt = f(x)"
    },
    {
      id: "laplace",
      name: "라플라스 변환",
      code: "\\mathcal{L}\\{f(t)\\} = F(s) = \\int_{0}^{\\infty} e^{-st} f(t) dt"
    },
    {
      id: "einstein",
      name: "질량-에너지 등가식",
      code: "E = mc^2"
    },
    {
      id: "maxwell",
      name: "맥스웰 방정식",
      code: "\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}"
    },
    {
      id: "schrodinger",
      name: "슈뢰딩거 파동방정식",
      code: "i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r}, t) = \\hat{H}\\Psi(\\mathbf{r}, t)"
    },
    {
      id: "navier_stokes",
      name: "나비에-스토크스 방정식",
      code: "\\rho \\left( \\frac{\\partial \\mathbf{v}}{\\partial t} + \\mathbf{v} \\cdot \\nabla \\mathbf{v} \\right) = -\\nabla p + \\mu \\nabla^2 \\mathbf{v} + \\mathbf{f}"
    },
    {
      id: "gravity",
      name: "만유인력 법칙",
      code: "F = G \\frac{m_1 m_2}{r^2}"
    },
    {
      id: "carnot",
      name: "카르노 열효율",
      code: "\\eta = 1 - \\frac{T_C}{T_H}"
    },
    {
      id: "normal_dist",
      name: "정규분포 밀도함수",
      code: "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2}"
    },
    {
      id: "bayes",
      name: "베이즈 정리",
      code: "P(A|B) = \\frac{P(B|A) P(A)}{P(B)}"
    },
    {
      id: "black_scholes",
      name: "블랙-숄즈 방정식",
      code: "\\frac{\\partial V}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} + r S \\frac{\\partial V}{\\partial S} - r V = 0"
    },
    {
      id: "clt",
      name: "중심극한정리",
      code: "\\sqrt{n}\\left(\\bar{X}_n - \\mu\\right) \\xrightarrow{d} \\mathcal{N}\\left(0, \\sigma^2\\right)"
    },
    {
      id: "sigmoid",
      name: "시그모이드 함수",
      code: "\\sigma(z) = \\frac{1}{1 + e^{-z}}"
    },
    {
      id: "poisson",
      name: "포아송 분포",
      code: "P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}"
    }
  ];

  const SYMBOLS = {
    basic: [
      { label: 'a/b', insert: '\\frac{a}{b}' },
      { label: '√x', insert: '\\sqrt{x}' },
      { label: 'ⁿ√x', insert: '\\sqrt[n]{x}' },
      { label: 'x²', insert: 'x^{2}' },
      { label: 'xᵢ', insert: 'x_{i}' },
      { label: '±', insert: '\\pm' },
      { label: '×', insert: '\\times' },
      { label: '÷', insert: '\\div' },
      { label: '·', insert: '\\cdot' },
      { label: '≠', insert: '\\neq' },
      { label: '≈', insert: '\\approx' },
      { label: '∞', insert: '\\infty' }
    ],
    calculus: [
      { label: '∫ dx', insert: '\\int_{a}^{b} f(x) dx' },
      { label: '∬', insert: '\\iint_{D} f(x, y) dA' },
      { label: '∮', insert: '\\oint_{C} \\mathbf{F} \\cdot d\\mathbf{r}' },
      { label: '∑', insert: '\\sum_{i=1}^{n}' },
      { label: '∏', insert: '\\prod_{i=1}^{n}' },
      { label: 'lim', insert: '\\lim_{x \\to 0}' },
      { label: 'df/dx', insert: '\\frac{df}{dx}' },
      { label: '∂f/∂x', insert: '\\frac{\\partial f}{\\partial x}' },
      { label: '∇', insert: '\\nabla' },
      { label: 'Δ', insert: '\\Delta' }
    ],
    greek: [
      { label: 'α', insert: '\\alpha' },
      { label: 'β', insert: '\\beta' },
      { label: 'γ', insert: '\\gamma' },
      { label: 'θ', insert: '\\theta' },
      { label: 'π', insert: '\\pi' },
      { label: 'σ', insert: '\\sigma' },
      { label: 'λ', insert: '\\lambda' },
      { label: 'ω', insert: '\\omega' },
      { label: 'μ', insert: '\\mu' },
      { label: 'ϕ', insert: '\\phi' },
      { label: 'ψ', insert: '\\psi' },
      { label: 'Ω', insert: '\\Omega' }
    ],
    matrix: [
      { label: '( 2×2 )', insert: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
      { label: '[ 2×2 ]', insert: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}' },
      { label: '{ 조건부', insert: '\\begin{cases} x & \\text{if } x > 0 \\\\ -x & \\text{otherwise} \\end{cases}' },
      { label: '( 분수 )', insert: '\\left( \\frac{a}{b} \\right)' },
      { label: '[ 분수 ]', insert: '\\left[ \\frac{a}{b} \\right]' }
    ],
    operators: [
      { label: '≤', insert: '\\leq' },
      { label: '≥', insert: '\\geq' },
      { label: '≪', insert: '\\ll' },
      { label: '≫', insert: '\\gg' },
      { label: '∈', insert: '\\in' },
      { label: '⊂', insert: '\\subset' },
      { label: '∪', insert: '\\cup' },
      { label: '∩', insert: '\\cap' },
      { label: '∀', insert: '\\forall' },
      { label: '∃', insert: '\\exists' },
      { label: '→', insert: '\\to' },
      { label: '⇒', insert: '\\Rightarrow' },
      { label: '⇔', insert: '\\iff' }
    ]
  };

  return {
    PRESETS,
    SYMBOLS
  };
})();
