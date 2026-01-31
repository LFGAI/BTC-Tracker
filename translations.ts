
export type Language = 'PT' | 'EN' | 'DE' | 'ES';

interface TranslationKeys {
  view_mode_easy: string;
  view_mode_pro: string;
  market_health: string;
  ai_prediction: string;
  simple_advice_title: string;
  trend_desc_bull: string;
  trend_desc_bear: string;
  reversal_alert: string;
  alpha_pro: string;
  market_selection: string;
  live_source: string;
  loading_engine: string;
  bull_phase: string;
  bear_phase: string;
  technical_signals: string;
  buy: string;
  sell: string;
  neutral: string;
  confidence: string;
  volatility: string;
  high: string;
  moderate: string;
  neural_feedback: string;
  consulting_web: string;
  protocol_advice: string;
  cycle_stage: string;
  halving_progress: string;
  eth_vitality: string;
  sol_momentum: string;
  gold_scarcity: string;
  days_left: string;
  completed: string;
  sentiment: string;
  tech_sentiment: string;
  market_sentiment: string;
  ia_processing: string;
  calculated_indicators: string;
  ia_sync: string;
  extreme_fear: string;
  fear: string;
  greed: string;
  extreme_greed: string;
  roi_simulator: string;
  roi_description: (weeks: number, price: string) => string;
  current_return: string;
  multiplier: string;
  roi_footer: string;
  set_alerts: string;
  asset: string;
  condition: string;
  value_ma: string;
  alert_type: string;
  add_alert: string;
  active_alerts: string;
  no_alerts: string;
  backtest_title: string;
  backtest_subtitle: string;
  win_rate: string;
  avg_return: string;
  confluence: string;
  trend_score: string;
  trend_alert: string;
  bullish_confirmed: string;
  undervalued: string;
  overbought: string;
  opportunity_accumulation: string;
  unsustainable_extension: string;
  equilibrium_zone: string;
  macro_analysis: string;
  calculating: string;
  log_scale: string;
  visibility_wma50: string;
  visibility_wma100: string;
  visibility_wma200: string;
  visibility_rsi: string;
  price: string;
  trend_50: string;
  trend_100: string;
  floor_200: string;
  chart_area: string;
  chart_candle: string;
  interval_day: string;
  interval_week: string;
  interval_month: string;
  reason_recovered_50: string;
  reason_lost_50: string;
  reason_200ma_zone: string;
  reason_below_50ma: string;
  reason_sustained_trend: string;
  reason_breakout: string;
  reason_breakdown: string;
  scarcity_stage: string;
  exchange_reserves: string;
  on_chain_data: string;
  prob_rise: string;
  prob_fall: string;
  prob_reversal: string;
  ai_forecast_title: string;
  recommendation_buy: string;
  recommendation_sell: string;
  recommendation_hodl: string;
  recommendation_title: string;
  ai_short_outlook: string;
  forecast_bullish: string;
  forecast_bearish: string;
  forecast_sideways: string;
  forecast_reversal: string;
  inflation_tracker_title: string;
  equivalent_price_label: string;
  inflation_index_label: string;
  inflation_desc_btc: string;
  inflation_desc_gold: string;
  purchasing_power_loss: string;
  purchasing_power_gain: string;
  methodology_title: string;
  methodology_desc: string;
  btc_gold_ratio: string;
  btc_gold_overvalued: string;
  btc_gold_undervalued: string;
  btc_gold_fair: string;
  btc_gold_desc: string;
  syncing: string;
  master_guide: string;
  wma50_desc: string;
  wma100_desc: string;
  wma200_desc: string;
  investment_amount: string;
  result_usd: string;
  total_position_value: string;
  side_long: string;
  side_short: string;
  condition_above: string;
  condition_below: string;
  condition_cross_above: string;
  condition_cross_below: string;
  timeframe_all: string;
  binance_label: string;
  momentum_rsi: string;
  halving_label: string;
  confluence_price_50: string;
  confluence_rsi_50: string;
  confluence_rsi_70: string;
  confluence_golden: string;
  confluence_higher_high: string;
  total_mined_btc: string;
  research_sources: string;
}

export const translations: Record<Language, TranslationKeys> = {
  PT: {
    view_mode_easy: "MODO SIMPLES",
    view_mode_pro: "MODO PRO",
    market_health: "SAÚDE DO MERCADO",
    ai_prediction: "PREVISÃO SEMANAL IA",
    simple_advice_title: "RESUMO PARA INVESTIDOR",
    trend_desc_bull: "O mercado está em tendência de alta. Geralmente um bom sinal para manter ou acumular com cautela.",
    trend_desc_bear: "O mercado está em tendência de baixa. Momento de paciência e possível acumulação para o longo prazo.",
    reversal_alert: "ALERTA DE REVERSÃO! O mercado pode mudar de direção em breve.",
    alpha_pro: "PRO",
    market_selection: "SELEÇÃO DE MERCADO",
    live_source: "FONTE LIVE",
    loading_engine: "MOTOR ALPHA INICIANDO...",
    bull_phase: "FASE BULL",
    bear_phase: "FASE BEAR",
    technical_signals: "SINAIS TÉCNICOS ALPHA",
    buy: "COMPRA",
    sell: "VENDA",
    neutral: "NEUTRO",
    confidence: "CONFIANÇA TÉCNICA",
    volatility: "VOLATILIDADE CICLO",
    high: "ALTA",
    moderate: "MODERADA",
    neural_feedback: "FEEDBACK NEURAL",
    consulting_web: "CONSULTANDO WEB...",
    protocol_advice: "CONSELHO DO PROTOCOLO",
    cycle_stage: "ESTÁGIO DO CICLO",
    halving_progress: "PROGRESSO DO HALVING",
    eth_vitality: "VITALIDADE DA REDE",
    sol_momentum: "IMPULSO DO ECOSSISTEMA",
    gold_scarcity: "ÍNDICE DE ESCASSEZ",
    days_left: "DIAS RESTANTES",
    completed: "COMPLETADO",
    sentiment: "SENTIMENTO",
    tech_sentiment: "SENTIMENTO TÉCNICO",
    market_sentiment: "SENTIMENTO DE MERCADO",
    ia_processing: "IA PROCESSANDO...",
    calculated_indicators: "CALCULADO VIA INDICADORES",
    ia_sync: "IA NEURAL SYNC",
    extreme_fear: "MEDO EXTREMO",
    fear: "MEDO",
    greed: "GANÂNCIA",
    extreme_greed: "GANÂNCIA EXTREMA",
    roi_simulator: "SIMULADOR ROI ALPHA",
    roi_description: (weeks: number, price: string) => `Se tivesse acumulado no último toque da 200SMA há ${weeks} semanas ($ ${price}):`,
    current_return: "RETORNO ATUAL",
    multiplier: "MULTIPLICADOR",
    roi_footer: "A 200SMA é o ponto de menor risco histórico.",
    set_alerts: "CONFIGURAR ALERTAS",
    asset: "ATIVO",
    condition: "CONDIÇÃO",
    value_ma: "VALOR / PERÍODO MA",
    alert_type: "TIPO DE ALERTA",
    add_alert: "ADICIONAR ALERTA",
    active_alerts: "SEUS ALERTAS ATIVOS",
    no_alerts: "NENHUM ALERTA CONFIGURADO.",
    backtest_title: "PERFORMANCE HISTÓRICA (BACKTEST)",
    backtest_subtitle: "RETORNO MÉDIO APÓS 4 SEMANAS",
    win_rate: "TAXA DE ACERTO",
    avg_return: "RETORNO MÉDIO",
    confluence: "CONFLUÊNCIA DE INDICADORES",
    trend_score: "ALPHA TREND SCORE SYSTEM",
    trend_alert: "ALERTA DE TENDÊNCIA",
    bullish_confirmed: "CONFIRMAÇÃO BULLISH ATIVADA",
    undervalued: "SINAL: SUBVALORADO",
    overbought: "SINAL: SOBRECOMPRADO",
    opportunity_accumulation: "OPORTUNIDADE DE ACUMULAÇÃO",
    unsustainable_extension: "EXTENSÃO INSUSTENTÁVEL",
    equilibrium_zone: "ZONA DE EQUILÍBRIO",
    macro_analysis: "ANÁLISE MACRO",
    calculating: "A CALCULAR...",
    log_scale: "LOG",
    visibility_wma50: "50MA",
    visibility_wma100: "100MA",
    visibility_wma200: "200SMA",
    visibility_rsi: "RSI",
    price: "PREÇO",
    trend_50: "TREND 50MA",
    trend_100: "TREND 100MA",
    floor_200: "FLOOR 200SMA",
    chart_area: "ÁREA",
    chart_candle: "CANDLES",
    interval_day: "DIA",
    interval_week: "SEM",
    interval_month: "MÊS",
    reason_recovered_50: "Recuperou 50MA.",
    reason_lost_50: "Perdeu 50MA.",
    reason_200ma_zone: "Zona de 200SMA.",
    reason_below_50ma: "Abaixo da 50MA.",
    reason_sustained_trend: "Tendência sustentada.",
    reason_breakout: "ROMPIMENTO",
    reason_breakdown: "QUEDA TÉCNICA",
    scarcity_stage: "ESTÁGIO DE ESCASSEZ",
    exchange_reserves: "RESERVAS EM EXCHANGES",
    on_chain_data: "DADOS ON-CHAIN",
    prob_rise: "PROB. SUBIDA (SEMANAL)",
    prob_fall: "PROB. QUEDA (SEMANAL)",
    prob_reversal: "PROB. REVERSÃO (SEMANAL)",
    ai_forecast_title: "PREVISÃO SEMANAL IA",
    recommendation_buy: "OPORTUNIDADE DE COMPRA",
    recommendation_sell: "OPORTUNIDADE DE VENDA",
    recommendation_hodl: "HODL / MANTER",
    recommendation_title: "RECOMENDAÇÃO ALPHA",
    ai_short_outlook: "PERSPECTIVA SEMANAL",
    forecast_bullish: "VIÉS DE ALTA",
    forecast_bearish: "VIÉS DE BAIXA",
    forecast_sideways: "LATERALIZAÇÃO",
    forecast_reversal: "RISCO DE REVERSÃO",
    inflation_tracker_title: "AJUSTE INFLACIONÁRIO",
    equivalent_price_label: "PREÇO EM DÓLARES DE HOJE",
    inflation_index_label: "ÍNDICE UTILIZADO",
    inflation_desc_btc: "Se o Bitcoin mantivesse o poder de compra do topo de 2021 ($69k), ajustado pela inflação monetária e de preços atual, o preço equivalente seria:",
    inflation_desc_gold: "O Ouro ajustado pela expansão monetária desde o último grande ciclo:",
    purchasing_power_loss: "PERDA DE PODER DE COMPRA",
    purchasing_power_gain: "GANHO DE PODER DE COMPRA",
    methodology_title: "METODOLOGIA",
    methodology_desc: "Cálculo baseado no rácio de inflação acumulada. Não é um target de preço nem previsão financeira.",
    btc_gold_ratio: "VALORAÇÃO BTC / OURO",
    btc_gold_overvalued: "BTC SOBREVALORADO VS OURO",
    btc_gold_undervalued: "BTC SUBVALORADO VS OURO",
    btc_gold_fair: "VALOR JUSTO VS OURO",
    btc_gold_desc: "Compara o poder de compra do Bitcoin em relação ao ouro físico.",
    syncing: "SINCRONIZANDO...",
    master_guide: "Guia Mestre",
    wma50_desc: "Média Móvel de 50 Semanas. É a linha divisória da tendência de médio prazo.",
    wma100_desc: "Média Móvel de 100 Semanas. Atua como suporte secundário em mercados de alta.",
    wma200_desc: "O 'Chão' do Ativo (SMA 200). Historicamente a melhor zona de acumulação de longo prazo.",
    investment_amount: "Valor do Investimento",
    result_usd: "Resultado (USD)",
    total_position_value: "Valor Total da Posição",
    side_long: "Comprar (Long)",
    side_short: "Vender (Short)",
    condition_above: "Preço Acima de",
    condition_below: "Preço Abaixo de",
    condition_cross_above: "Cruzar Acima de Média",
    condition_cross_below: "Cruzar Abaixo de Média",
    timeframe_all: "TUDO",
    binance_label: "BINANCE",
    momentum_rsi: "Momentum RSI (14)",
    halving_label: "HALVING",
    confluence_price_50: "Preço > 50WMA (Tendência)",
    confluence_rsi_50: "RSI > 50 (Momentum)",
    confluence_rsi_70: "RSI < 70 (Espaço p/ Crescer)",
    confluence_golden: "50WMA > 200SMA (Ciclo)",
    confluence_higher_high: "Topo Maior (Price Action)",
    total_mined_btc: "TOTAL MINADO BTC",
    research_sources: "FONTES DE PESQUISA",
  },
  EN: {
    view_mode_easy: "EASY MODE",
    view_mode_pro: "PRO MODE",
    market_health: "MARKET HEALTH",
    ai_prediction: "WEEKLY AI FORECAST",
    simple_advice_title: "INVESTOR SUMMARY",
    trend_desc_bull: "The market is in an uptrend. Generally a good sign to hold or accumulate with caution.",
    trend_desc_bear: "The market is in a downtrend. A time for patience and potential long-term accumulation.",
    reversal_alert: "REVERSAL ALERT! The market direction might change soon.",
    alpha_pro: "PRO",
    market_selection: "MARKET SELECTION",
    live_source: "LIVE SOURCE",
    loading_engine: "ALPHA ENGINE BOOTING...",
    bull_phase: "BULL PHASE",
    bear_phase: "BEAR PHASE",
    technical_signals: "ALPHA TECHNICAL SIGNALS",
    buy: "BUY",
    sell: "SELL",
    neutral: "NEUTRAL",
    confidence: "TECHNICAL CONFIDENCE",
    volatility: "CYCLE VOLATILITY",
    high: "HIGH",
    moderate: "MODERATE",
    neural_feedback: "NEURAL FEEDBACK",
    consulting_web: "CONSULTING WEB...",
    protocol_advice: "PROTOCOL ADVICE",
    cycle_stage: "CYCLE STAGE",
    halving_progress: "HALVING PROGRESS",
    eth_vitality: "NETWORK VITALITY",
    sol_momentum: "ECOSYSTEM MOMENTUM",
    gold_scarcity: "SCARCITY INDEX",
    days_left: "DAYS LEFT",
    completed: "COMPLETED",
    sentiment: "SENTIMENT",
    tech_sentiment: "TECHNICAL SENTIMENT",
    market_sentiment: "MARKET SENTIMENT",
    ia_processing: "AI PROCESSING...",
    calculated_indicators: "FROM INDICATORS",
    ia_sync: "AI NEURAL SYNC",
    extreme_fear: "EXTREME FEAR",
    fear: "FEAR",
    greed: "GREED",
    extreme_greed: "EXTREME GREED",
    roi_simulator: "ALPHA ROI SIMULATOR",
    roi_description: (weeks: number, price: string) => `If you accumulated at the last 200SMA touch ${weeks} weeks ago ($ ${price}):`,
    current_return: "CURRENT RETURN",
    multiplier: "MULTIPLIER",
    roi_footer: "The 200SMA is the historically lowest risk point.",
    set_alerts: "SET CUSTOM ALERTS",
    asset: "ASSET",
    condition: "CONDITION",
    value_ma: "VALUE / MA PERIOD",
    alert_type: "ALERT TYPE",
    add_alert: "ADD ALERT",
    active_alerts: "YOUR ACTIVE ALERTS",
    no_alerts: "NO CUSTOM ALERTS SET.",
    backtest_title: "HISTORICAL PERFORMANCE (BACKTEST)",
    backtest_subtitle: "AVG RETURN AFTER 4 WEEKS",
    win_rate: "WIN RATE",
    avg_return: "AVG RETURN",
    confluence: "INDICATOR CONFLUENCE",
    trend_score: "ALPHA TREND SCORE SYSTEM",
    trend_alert: "TREND ALERT",
    bullish_confirmed: "BULLISH CONFIRMATION ACTIVE",
    undervalued: "SIGNAL: UNDERVALUED",
    overbought: "SIGNAL: OVERBOUGHT",
    opportunity_accumulation: "ACCUMULATION OPPORTUNITY",
    unsustainable_extension: "UNSUSTAINABLE EXTENSION",
    equilibrium_zone: "EQUILIBRIUM ZONE",
    macro_analysis: "MACRO ANALYSIS",
    calculating: "CALCULATING...",
    log_scale: "LOG",
    visibility_wma50: "50MA",
    visibility_wma100: "100MA",
    visibility_wma200: "200SMA",
    visibility_rsi: "RSI",
    price: "PRICE",
    trend_50: "TREND 50MA",
    trend_100: "TREND 100MA",
    floor_200: "FLOOR 200SMA",
    chart_area: "AREA",
    chart_candle: "CANDLES",
    interval_day: "DAY",
    interval_week: "WEEK",
    interval_month: "MONTH",
    reason_recovered_50: "Recovered 50MA.",
    reason_lost_50: "Lost 50MA.",
    reason_200ma_zone: "200SMA Zone.",
    reason_below_50ma: "Below 50MA.",
    reason_sustained_trend: "Sustained trend.",
    reason_breakout: "BREAKOUT",
    reason_breakdown: "TECHNICAL BREAKDOWN",
    scarcity_stage: "SCARCITY STAGE",
    exchange_reserves: "EXCHANGE RESERVES",
    on_chain_data: "ON-CHAIN DATA",
    prob_rise: "RISE PROB. (WEEKLY)",
    prob_fall: "FALL PROB. (WEEKLY)",
    prob_reversal: "REVERSAL PROB. (WEEKLY)",
    ai_forecast_title: "WEEKLY AI FORECAST",
    recommendation_buy: "BUY OPPORTUNITY",
    recommendation_sell: "SELL OPPORTUNITY",
    recommendation_hodl: "HODL / MAINTAIN",
    recommendation_title: "ALPHA RECOMMENDATION",
    ai_short_outlook: "WEEKLY OUTLOOK",
    forecast_bullish: "BULLISH BIAS",
    forecast_bearish: "BEARISH BIAS",
    forecast_sideways: "LATERAL CONSOLIDATION",
    forecast_reversal: "HIGH REVERSAL RISK",
    inflation_tracker_title: "INFLATION ADJUSTMENT",
    equivalent_price_label: "PRICE IN TODAY'S DOLLARS",
    inflation_index_label: "INDEX USED",
    inflation_desc_btc: "If Bitcoin maintained its Nov 2021 peak purchasing power ($69k), adjusted by today's monetary/price inflation, the equivalent price would be:",
    inflation_desc_gold: "Gold adjusted by monetary expansion since the last major cycle:",
    purchasing_power_loss: "PURCHASING POWER LOSS",
    purchasing_power_gain: "PURCHASING POWER GAIN",
    methodology_title: "METHODOLOGY",
    methodology_desc: "Calculated based on cumulative inflation ratio. Not a price target or financial forecast.",
    btc_gold_ratio: "BTC / GOLD VALUATION",
    btc_gold_overvalued: "BTC OVERVALUED VS GOLD",
    btc_gold_undervalued: "BTC UNDERVALUED VS GOLD",
    btc_gold_fair: "FAIR VALUE VS GOLD",
    btc_gold_desc: "Compares Bitcoin's purchasing power relative to physical gold.",
    syncing: "SYNCING...",
    master_guide: "Master Guide",
    wma50_desc: "50-Week Moving Average. The dividing line for the mid-term trend.",
    wma100_desc: "100-Week Moving Average. Acts as secondary support in bull markets.",
    wma200_desc: "The Asset 'Floor' (SMA 200). Historically the best long-term accumulation zone.",
    investment_amount: "Investment Amount",
    result_usd: "Result (USD)",
    total_position_value: "Total Position Value",
    side_long: "Long",
    side_short: "Short",
    condition_above: "Price Above",
    condition_below: "Price Below",
    condition_cross_above: "Cross Above MA",
    condition_cross_below: "Cross Below MA",
    timeframe_all: "ALL",
    binance_label: "BINANCE",
    momentum_rsi: "Momentum RSI (14)",
    halving_label: "HALVING",
    confluence_price_50: "Price > 50WMA (Trend)",
    confluence_rsi_50: "RSI > 50 (Momentum)",
    confluence_rsi_70: "RSI < 70 (Room to Grow)",
    confluence_golden: "50WMA > 200SMA (Cycle)",
    confluence_higher_high: "Higher High (Price Action)",
    total_mined_btc: "TOTAL MINED BTC",
    research_sources: "RESEARCH SOURCES",
  },
  DE: {
    view_mode_easy: "EINFACHER MODUS",
    view_mode_pro: "PRO MODUS",
    market_health: "MARKTGESUNDHEIT",
    ai_prediction: "WÖCHENTLICHE KI-VORHERSAGE",
    simple_advice_title: "INVESTOREN-ZUSAMMENFASSUNG",
    trend_desc_bull: "Der Markt befindet sich in einem Aufwärtstrend. Im Allgemeinen ein gutes Zeichen zum Halten oder vorsichtigen Akkumulieren.",
    trend_desc_bear: "Der Markt befindet sich in einem Abwärtstrend. Zeit für Geduld und potenzielle langfristige Akkumulation.",
    reversal_alert: "UMKEHR-ALARM! Die Marktrichtung könnte sich bald ändern.",
    alpha_pro: "PRO",
    market_selection: "MARKT AUSWAHL",
    live_source: "LIVE-QUELLE",
    loading_engine: "ALPHA ENGINE STARTET...",
    bull_phase: "BULLENPHASE",
    bear_phase: "BÄRENPHASE",
    technical_signals: "TECHNISCHE ALPHA-SIGNALE",
    buy: "KAUFEN",
    sell: "VERKAUFEN",
    neutral: "NEUTRAL",
    confidence: "TECHNISCHES VERTRAUEN",
    volatility: "ZYKLUS-VOLATILITÄT",
    high: "HOCH",
    moderate: "MODERAT",
    neural_feedback: "NEURALES FEEDBACK",
    consulting_web: "WEB-ABFRAGE...",
    protocol_advice: "PROTOKOLL-RATSCHLAG",
    cycle_stage: "ZYKLUS-STADIUM",
    halving_progress: "HALVING-FORTSCHRITT",
    eth_vitality: "NETZWERK-VITALITÄT",
    sol_momentum: "ÖKOSYSTEM-MOMENTUM",
    gold_scarcity: "KNAPPHEITS-INDEX",
    days_left: "TAGE ÜBRIG",
    completed: "ABGESCHLOSSEN",
    sentiment: "SENTIMENT",
    tech_sentiment: "TECHNISCHES SENTIMENT",
    market_sentiment: "MARKTSENTIMENT",
    ia_processing: "KI VERARBEITET...",
    calculated_indicators: "AUS INDIKATOREN",
    ia_sync: "KI NEURAL SYNC",
    extreme_fear: "EXTREME ANGST",
    fear: "ANGST",
    greed: "GIER",
    extreme_greed: "EXTREME GIER",
    roi_simulator: "ALPHA ROI SIMULATOR",
    roi_description: (weeks: number, price: string) => `Hätten Sie beim letzten 200SMA-Touch vor ${weeks} Wochen ($ ${price}) akkumuliert:`,
    current_return: "AKTUELLE RENDITE",
    multiplier: "MULTIPLICADOR",
    roi_footer: "Der 200SMA ist historisch der risikoärmste Punkt.",
    set_alerts: "ALARME EINSTELLEN",
    asset: "ASSET",
    condition: "BEDINGUNG",
    value_ma: "WERT / MA PERIOD",
    alert_type: "ALARM-TYP",
    add_alert: "ALARM HINZUFÜGEN",
    active_alerts: "AKTIVE ALARME",
    no_alerts: "KEINE ALARME EINGESTELLT.",
    backtest_title: "HISTORISCHE PERFORMANCE (BACKTEST)",
    backtest_subtitle: "DURCHSCHN. RENDITE NACH 4 WOCHEN",
    win_rate: "ERFOLGSQUOTE",
    avg_return: "DURCHSCHN. RENDITE",
    confluence: "INDIKATOR-KONFLUENZ",
    trend_score: "ALPHA TREND SCORE SYSTEM",
    trend_alert: "TREND-ALARM",
    bullish_confirmed: "BULLISH BESTÄTIGUNG AKTIV",
    undervalued: "SIGNAL: UNTERBEWERTET",
    overbought: "SIGNAL: ÜBERKAUFT",
    opportunity_accumulation: "AKKUMULATIONS-CHANCE",
    unsustainable_extension: "UNHALTBARE AUSDEHNUNG",
    equilibrium_zone: "GLEICHGEWICHTSZONE",
    macro_analysis: "MAKRO-ANALYSE",
    calculating: "BERECHNE...",
    log_scale: "LOG",
    visibility_wma50: "50MA",
    visibility_wma100: "100MA",
    visibility_wma200: "200SMA",
    visibility_rsi: "RSI",
    price: "PREIS",
    trend_50: "TREND 50MA",
    trend_100: "TREND 100MA",
    floor_200: "FLOOR 200SMA",
    chart_area: "AREA",
    chart_candle: "CANDLES",
    interval_day: "TAG",
    interval_week: "WOCHE",
    interval_month: "MONAT",
    reason_recovered_50: "50MA zurückgewonnen.",
    reason_lost_50: "50MA verloren.",
    reason_200ma_zone: "200SMA Zone.",
    reason_below_50ma: "Unter 50MA.",
    reason_sustained_trend: "Anhaltender Trend.",
    reason_breakout: "AUSBRUCH",
    reason_breakdown: "TECHNISCHER EINBRUCH",
    scarcity_stage: "KNAPPHEITS-STADIUM",
    exchange_reserves: "BÖRSEN-RESERVEN",
    on_chain_data: "ON-CHAIN DATEN",
    prob_rise: "ANSTIEGS-WAHRSCH. (WÖCHENTL.)",
    prob_fall: "FALL-WAHRSCH. (WÖCHENTL.)",
    prob_reversal: "UMKEHR-WAHRSCH. (WÖCHENTL.)",
    ai_forecast_title: "WÖCHENTLICHE KI-VORHERSAGE",
    recommendation_buy: "KAUFGELEGENHEIT",
    recommendation_sell: "VERKAUFGELEGENHEIT",
    recommendation_hodl: "HODL / BEIBEHALTEN",
    recommendation_title: "ALPHA EMPFEHLUNG",
    ai_short_outlook: "WÖCHENTLICHER AUSBLICK",
    forecast_bullish: "BULLISCHER TREND",
    forecast_bearish: "BÄRISCHER TREND",
    forecast_sideways: "KONSOLIDIERUNG",
    forecast_reversal: "HOHE UMKEHRGEFAHR",
    inflation_tracker_title: "INFLATIONSANPASSUNG",
    equivalent_price_label: "PREIS EM HEUTIGEN DOLLAR",
    inflation_index_label: "VERWENDETER INDEX",
    inflation_desc_btc: "Wenn Bitcoin die Kaufkraft des Höchststands von 2021 ($69k) beibehalten würde, wäre der inflationsbereinigte Preis hoje:",
    inflation_desc_gold: "Gold inflationsbereinigt seit dem letzten großen Zyklus:",
    purchasing_power_loss: "KAUFKRAFTVERLUST",
    purchasing_power_gain: "KAUFKRAFTGEWINN",
    methodology_title: "METHODIK",
    methodology_desc: "Berechnet auf Basis des kumulativen Inflationsverhältnisses. Kein Preisziel oder Vorhersage.",
    btc_gold_ratio: "BTC / GOLD BEWERTUNG",
    btc_gold_overvalued: "BTC ÜBERBEWERTET VS GOLD",
    btc_gold_undervalued: "BTC UNTERBEWERTET VS GOLD",
    btc_gold_fair: "FAIRER WERT VS GOLD",
    btc_gold_desc: "Vergleicht die Kaufkraft von Bitcoin im Verhältnis zu physischem Gold.",
    syncing: "SYNCHRONISIERE...",
    master_guide: "Master-Leitfaden",
    wma50_desc: "50-Wochen-Gleitender Durchschnitt. Trennlinie für den mittelfristigen Trend.",
    wma100_desc: "100-Wochen-Gleitender Durchschnitt. Wirkt als sekundäre Unterstützung.",
    wma200_desc: "Der Asset-Boden (SMA 200). Historisch die beste Zone für langfristige Akkumulation.",
    investment_amount: "Investitionsbetrag",
    result_usd: "Ergebnis (USD)",
    total_position_value: "Gesamtwert der Position",
    side_long: "Kaufen (Long)",
    side_short: "Verkaufen (Short)",
    condition_above: "Preis über",
    condition_below: "Preis unter",
    condition_cross_above: "Über MA kreuzen",
    condition_cross_below: "Unter MA kreuzen",
    timeframe_all: "ALLES",
    binance_label: "BINANCE",
    momentum_rsi: "Momentum RSI (14)",
    halving_label: "HALVING",
    confluence_price_50: "Preis > 50WMA (Trend)",
    confluence_rsi_50: "RSI > 50 (Momentum)",
    confluence_rsi_70: "RSI < 70 (Wachstumsraum)",
    confluence_golden: "50WMA > 200SMA (Zyklus)",
    confluence_higher_high: "Höheres Hoch (Price Action)",
    total_mined_btc: "GESAMT MINIERTE BTC",
    research_sources: "RECHERCHEQUELLEN",
  },
  ES: {
    view_mode_easy: "MODO SIMPLE",
    view_mode_pro: "MODO PRO",
    market_health: "SALUD DEL MERCADO",
    ai_prediction: "PREDICCIÓN SEMANAL IA",
    simple_advice_title: "RESUMEN PARA INVERSORES",
    trend_desc_bull: "El mercado está en tendencia alcista. Generalmente una buena señal para mantener o acumular con precaución.",
    trend_desc_bear: "El mercado está en tendencia bajista. Momento de paciencia y posible acumulación a largo plazo.",
    reversal_alert: "¡ALERTA DE REVERSIÓN! La dirección del mercado podría cambiar pronto.",
    alpha_pro: "PRO",
    market_selection: "SELECCIÓN DE MERCADO",
    live_source: "FUENTE EN VIVO",
    loading_engine: "INICIANDO MOTOR ALPHA...",
    bull_phase: "FASE BULL",
    bear_phase: "FASE BEAR",
    technical_signals: "SEÑALES TÉCNICAS ALPHA",
    buy: "COMPRA",
    sell: "VENTA",
    neutral: "NEUTRO",
    confidence: "CONFIANZA TÉCNICA",
    volatility: "VOLATILIDAD DEL CICLO",
    high: "ALTA",
    moderate: "MODERADA",
    neural_feedback: "FEEDBACK NEURAL",
    consulting_web: "CONSULTANDO WEB...",
    protocol_advice: "CONSEJO DEL PROTOCOLO",
    cycle_stage: "ETAPA DEL CICLO",
    halving_progress: "PROGRESO DEL HALVING",
    eth_vitality: "VITALIDAD DE LA RED",
    sol_momentum: "IMPULSO DEL ECOSISTEMA",
    gold_scarcity: "ÍNDICE DE ESCASEZ",
    days_left: "DÍAS RESTANTES",
    completed: "COMPLETADO",
    sentiment: "SENTIMIENTO",
    tech_sentiment: "SENTIMIENTO TÉCNICO",
    market_sentiment: "SENTIMIENTO DE MERCADO",
    ia_processing: "IA PROCESANDO...",
    calculated_indicators: "DE INDICADORES",
    ia_sync: "IA NEURAL SYNC",
    extreme_fear: "MIEDO EXTREMO",
    fear: "MIEDO",
    greed: "CODICIA",
    extreme_greed: "CODICIA EXTREMA",
    roi_simulator: "SIMULADOR ROI ALPHA",
    roi_description: (weeks: number, price: string) => `Si hubieras acumulado en el último toque de la 200SMA hace ${weeks} semanas ($ ${price}):`,
    current_return: "RETORNO ACTUAL",
    multiplier: "MULTIPLICADOR",
    roi_footer: "La 200SMA es históricamente el punto de menor riesgo.",
    set_alerts: "CONFIGURAR ALERTAS",
    asset: "ACTIVO",
    condition: "CONDICIÓN",
    value_ma: "VALOR / PERIODO MA",
    alert_type: "TIPO DE ALERTA",
    add_alert: "AÑADIR ALERTA",
    active_alerts: "SUS ALERTAS ACTIVAS",
    no_alerts: "NO HAY ALERTAS CONFIGURADAS.",
    backtest_title: "RENDIMIENTO HISTÓRICO (BACKTEST)",
    backtest_subtitle: "RETORNO PROMEDIO TRAS 4 SEMANAS",
    win_rate: "TASA DE ACIERTO",
    avg_return: "RETORNO PROMEDIO",
    confluence: "CONFLUENCIA DE INDICADORES",
    trend_score: "ALPHA TREND SCORE SYSTEM",
    trend_alert: "ALERTA DE TENDÊNCIA",
    bullish_confirmed: "CONFIRMACIÓN BULLISH ACTIVA",
    undervalued: "SEÑAL: INFRAVALORADO",
    overbought: "SEÑAL: SOBRECOMPRADO",
    opportunity_accumulation: "OPORTUNIDADE DE ACUMULAÇÃO",
    unsustainable_extension: "EXTENSIÓN INSOSTENIBLE",
    equilibrium_zone: "ZONA DE EQUILÍBRIO",
    macro_analysis: "ANÁLISIS MACRO",
    calculating: "CALCULANDO...",
    log_scale: "LOG",
    visibility_wma50: "50MA",
    visibility_wma100: "100MA",
    visibility_wma200: "200SMA",
    visibility_rsi: "RSI",
    price: "PRECIO",
    trend_50: "TREND 50MA",
    trend_100: "TREND 100MA",
    floor_200: "FLOOR 200SMA",
    chart_area: "AREA",
    chart_candle: "VELAS",
    interval_day: "DÍA",
    interval_week: "SEM",
    interval_month: "MES",
    reason_recovered_50: "Recuperó 50MA.",
    reason_lost_50: "Perdió 50MA.",
    reason_200ma_zone: "Zona de 200SMA.",
    reason_below_50ma: "Por debajo de 50MA.",
    reason_sustained_trend: "Tendencia sostenida.",
    reason_breakout: "ROMPIMIENTO",
    reason_breakdown: "CAÍDA TÉCNICA",
    scarcity_stage: "ETAPA DE ESCASEZ",
    exchange_reserves: "RESERVAS EN EXCHANGES",
    on_chain_data: "DATOS ON-CHAIN",
    prob_rise: "PROB. SUBIDA (SEMANAL)",
    prob_fall: "PROB. CAÍDA (SEMANAL)",
    prob_reversal: "PROB. REVERSIÓN (SEMANAL)",
    ai_forecast_title: "PREDICCIÓN SEMANAL IA",
    recommendation_buy: "OPORTUNIDADE DE COMPRA",
    recommendation_sell: "OPORTUNIDADE DE VENDA",
    recommendation_hodl: "HODL / MANTENER",
    recommendation_title: "RECOMENDACIÓN ALPHA",
    ai_short_outlook: "PERSPECTIVA SEMANAL",
    forecast_bullish: "SESGO ALCISTA",
    forecast_bearish: "SESGO BAJISTA",
    forecast_sideways: "CONSOLIDACIÓN LATERAL",
    forecast_reversal: "ALTO RIESGO DE REVERSIÓN",
    inflation_tracker_title: "AJUSTE INFLACIONARIO",
    equivalent_price_label: "PRECIO EM DÓLARES DE HOY",
    inflation_index_label: "ÍNDICE UTILIZADO",
    inflation_desc_btc: "Si Bitcoin mantuviera el poder adquisitivo del máximo de 2021 ($69k), ajustado por la inflación monetaria/precios actual, el precio equivalente sería:",
    inflation_desc_gold: "Oro ajustado por expansión monetaria desde el último gran ciclo:",
    purchasing_power_loss: "PÉRDIDA DE PODER ADQUISITIVO",
    purchasing_power_gain: "GANANCIA DE PODER ADQUISITIVO",
    methodology_title: "METODOLOGÍA",
    methodology_desc: "Cálculo basado en el ratio de inflación acumulada. No é um target de precio ni previsión.",
    btc_gold_ratio: "VALORACIÓN BTC / ORO",
    btc_gold_overvalued: "BTC SOBREVALORADO VS ORO",
    btc_gold_undervalued: "BTC INFRAVALORADO VS ORO",
    btc_gold_fair: "VALOR JUSTO VS ORO",
    btc_gold_desc: "Compara el poder adquisitivo de Bitcoin en relación con el oro físico.",
    syncing: "SINCRONIZANDO...",
    master_guide: "Guía Maestra",
    wma50_desc: "Promedio Móvil de 50 Semanas. Es la línea divisória de la tendencia a medio plazo.",
    wma100_desc: "Promedio Móvil de 100 Semanas. Actúa como soporte secundario en mercados alcistas.",
    wma200_desc: "El 'Suelo' del Activo (SMA 200). Históricamente la mejor zona de acumulação a largo plazo.",
    investment_amount: "Cantidad de Inversión",
    result_usd: "Resultado (USD)",
    total_position_value: "Valor Total de la Posición",
    side_long: "Comprar (Long)",
    side_short: "Vender (Short)",
    condition_above: "Precio Por Encima",
    condition_below: "Precio Por Debajo",
    condition_cross_above: "Cruzar Encima MA",
    condition_cross_below: "Cruzar Debajo MA",
    timeframe_all: "TODO",
    binance_label: "BINANCE",
    momentum_rsi: "Momentum RSI (14)",
    halving_label: "HALVING",
    confluence_price_50: "Precio > 50WMA (Tendência)",
    confluence_rsi_50: "RSI > 50 (Momentum)",
    confluence_rsi_70: "RSI < 70 (Espacio p/ Crecer)",
    confluence_golden: "50WMA > 200SMA (Ciclo)",
    confluence_higher_high: "Máximo Mayor (Price Action)",
    total_mined_btc: "TOTAL MINADO BTC",
    research_sources: "FUENTES DE INVESTIGACIÓN",
  }
};
