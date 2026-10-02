// ==========================================================================
// 수식 기호 팔레트 및 빈출 공식 프리셋 정의
// ==========================================================================
const LatexData = (function () {
  const PRESETS = [
    {
      id: 'gaussian',
      name: '가우스 적분',
      code: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}'
    },
    {
      id: 'quadratic',
      name: '근의 공식',
      code: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'
    },
    {
      id: 'euler',
      name: '오일러 등식',
      code: 'e^{i\\pi} + 1 = 0'
    },
    {
      id: 'normal_dist',
      name: '정규분포 밀도함수',
      code: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2}'
    },
    {
      id: 'maxwell',
      name: '맥스웰 방정식',
      code: '\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}'
    },
    {
      id: 'einstein',
      name: '질량-에너지 등가식',
      code: 'E = mc^2'
    },
    {
      id: 'fourier',
      name: '푸리에 변환',
      code: '\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x \\xi} dx'
    },
    {
      id: 'schrodinger',
      name: '슈뢰딩거 파동방정식',
      code: 'i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r}, t) = \\hat{H}\\Psi(\\mathbf{r}, t)'
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
