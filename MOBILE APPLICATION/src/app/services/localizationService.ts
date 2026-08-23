// Global Driver Accessibility & Localization Service
// Supports multiple languages, time zones, and unit conversions

interface LocalizationConfig {
  language: string;
  timezone: string;
  units: 'metric' | 'imperial';
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

interface TranslationKey {
  key: string;
  translations: Record<string, string>;
}

class LocalizationService {
  private config: LocalizationConfig = {
    language: 'en',
    timezone: 'UTC',
    units: 'metric',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h'
  };

  private translations: Record<string, TranslationKey> = {
    mission_ready: {
      key: 'mission_ready',
      translations: {
        en: 'Mission Ready',
        es: 'Misión Lista',
        fr: 'Mission Prête',
        de: 'Mission Bereit',
        hi: 'मिशन तैयार है',
        zh: '任务就绪',
        ja: 'ミッション準備完了'
      }
    },
    delivery_verified: {
      key: 'delivery_verified',
      translations: {
        en: 'Delivery Verified',
        es: 'Entrega Verificada',
        fr: 'Livraison Vérifiée',
        de: 'Lieferung Verifiziert',
        hi: 'डिलीवरी सत्यापित',
        zh: '配送已验证',
        ja: '配達確認済み'
      }
    },
    recovery_required: {
      key: 'recovery_required',
      translations: {
        en: 'Recovery Required',
        es: 'Recuperación Requerida',
        fr: 'Récupération Requise',
        de: 'Wiederherstellung Erforderlich',
        hi: 'पुनर्प्राप्ति आवश्यक',
        zh: '需要恢复',
        ja: '回復が必要'
      }
    },
    emergency_mode: {
      key: 'emergency_mode',
      translations: {
        en: 'Emergency Mode',
        es: 'Modo de Emergencia',
        fr: 'Mode d\'Urgence',
        de: 'Notfallmodus',
        hi: 'आपातकालीन मोड',
        zh: '紧急模式',
        ja: '緊急モード'
      }
    },
    network_offline: {
      key: 'network_offline',
      translations: {
        en: 'Network Offline',
        es: 'Red Desconectada',
        fr: 'Réseau Hors Ligne',
        de: 'Netzwerk Offline',
        hi: 'नेटवर्क ऑफलाइन',
        zh: '网络离线',
        ja: 'ネットワークオフライン'
      }
    },
    gps_limited: {
      key: 'gps_limited',
      translations: {
        en: 'GPS Limited',
        es: 'GPS Limitado',
        fr: 'GPS Limité',
        de: 'GPS Eingeschränkt',
        hi: 'GPS सीमित',
        zh: 'GPS受限',
        ja: 'GPS制限あり'
      }
    },
    mission_handover: {
      key: 'mission_handover',
      translations: {
        en: 'Mission Handover',
        es: 'Transferencia de Misión',
        fr: 'Transfert de Mission',
        de: 'Missionübergabe',
        hi: 'मिशन हैंडओवर',
        zh: '任务交接',
        ja: 'ミッション引き継ぎ'
      }
    },
    active_mission: {
      key: 'active_mission',
      translations: {
        en: 'Active Mission',
        es: 'Misión Activa',
        fr: 'Mission Active',
        de: 'Aktive Mission',
        hi: 'सक्रिय मिशन',
        zh: '活动任务',
        ja: 'アクティブミッション'
      }
    },
    driver_safety: {
      key: 'driver_safety',
      translations: {
        en: 'Driver Safety',
        es: 'Seguridad del Conductor',
        fr: 'Sécurité du Conducteur',
        de: 'Fahrersicherheit',
        hi: 'ड्राइवर सुरक्षा',
        zh: '驾驶员安全',
        ja: 'ドライバー安全'
      }
    },
    sync_conflict: {
      key: 'sync_conflict',
      translations: {
        en: 'Sync Conflict',
        es: 'Conflicto de Sincronización',
        fr: 'Conflit de Synchronisation',
        de: 'Synchronisationskonflikt',
        hi: 'सिंक संघर्ष',
        zh: '同步冲突',
        ja: '同期化の競合'
      }
    },
    low_power_mode: {
      key: 'low_power_mode',
      translations: {
        en: 'Low Power Mode',
        es: 'Modo de Baja Potencia',
        fr: 'Mode Faible Puissance',
        de: 'Energiesparmodus',
        hi: 'कम बिजली मोड',
        zh: '低功耗模式',
        ja: '省電モード'
      }
    }
  };

  // Initialize with saved config or defaults
  constructor() {
    this.loadConfig();
  }

  // Configuration Management
  setConfig(config: Partial<LocalizationConfig>): void {
    this.config = { ...this.config, ...config };
    this.saveConfig();
  }

  getConfig(): LocalizationConfig {
    return { ...this.config };
  }

  private loadConfig(): void {
    try {
      const saved = localStorage.getItem('localization_config');
      if (saved) {
        this.config = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load localization config:', error);
    }
  }

  private saveConfig(): void {
    try {
      localStorage.setItem('localization_config', JSON.stringify(this.config));
    } catch (error) {
      console.error('Failed to save localization config:', error);
    }
  }

  // Translation
  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    return translation.translations[this.config.language] || translation.translations['en'] || key;
  }

  // Date/Time Formatting
  formatDateTime(timestamp: number | string): string {
    const date = new Date(timestamp);
    
    // Convert to configured timezone
    const timezoneDate = this.convertToTimezone(date);
    
    // Format date
    const dateStr = this.formatDate(timezoneDate);
    
    // Format time
    const timeStr = this.formatTime(timezoneDate);
    
    return `${dateStr} ${timeStr}`;
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    switch (this.config.dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default:
        return `${day}/${month}/${year}`;
    }
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    if (this.config.timeFormat === '12h') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes} ${ampm}`;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
  }

  formatTimeOnly(timestamp: number | string): string {
    const date = new Date(timestamp);
    const timezoneDate = this.convertToTimezone(date);
    return this.formatTime(timezoneDate);
  }

  convertToTimezone(date: Date): Date {
    // In production, use a timezone library like Luxon or date-fns-tz
    // For demo, we'll simulate timezone conversion
    const timezoneOffset = this.getTimezoneOffset(this.config.timezone);
    return new Date(date.getTime() + timezoneOffset);
  }

  private getTimezoneOffset(timezone: string): number {
    // Simplified timezone offset calculation
    // In production, use proper timezone library
    const offsets: Record<string, number> = {
      'UTC': 0,
      'America/New_York': -5 * 60 * 60 * 1000,
      'America/Los_Angeles': -8 * 60 * 60 * 1000,
      'Europe/London': 0,
      'Europe/Paris': 1 * 60 * 60 * 1000,
      'Asia/Kolkata': 5.5 * 60 * 60 * 1000,
      'Asia/Tokyo': 9 * 60 * 60 * 1000,
      'Asia/Shanghai': 8 * 60 * 60 * 1000,
    };
    
    return offsets[timezone] || 0;
  }

  // Unit Conversion
  convertDistance(value: number, from: 'km' | 'mi', to?: 'km' | 'mi'): number {
    const targetUnit = to || this.config.units === 'metric' ? 'km' : 'mi';
    
    if (from === targetUnit) return value;
    
    // Convert to km first
    const inKm = from === 'mi' ? value * 1.60934 : value;
    
    // Convert to target
    return targetUnit === 'mi' ? inKm / 1.60934 : inKm;
  }

  convertSpeed(value: number, from: 'kmh' | 'mph', to?: 'kmh' | 'mph'): number {
    const targetUnit = to || this.config.units === 'metric' ? 'kmh' : 'mph';
    
    if (from === targetUnit) return value;
    
    // Convert to kmh first
    const inKmh = from === 'mph' ? value * 1.60934 : value;
    
    // Convert to target
    return targetUnit === 'mph' ? inKmh / 1.60934 : inKmh;
  }

  getDistanceUnit(): string {
    return this.config.units === 'metric' ? 'km' : 'mi';
  }

  getSpeedUnit(): string {
    return this.config.units === 'metric' ? 'km/h' : 'mph';
  }

  // ETA Calculation with Timezone
  calculateETA(currentTime: number, durationMinutes: number): string {
    const arrivalTime = new Date(currentTime + durationMinutes * 60 * 1000);
    const timezoneArrival = this.convertToTimezone(arrivalTime);
    return this.formatTime(timezoneArrival);
  }

  // Supported Languages
  getSupportedLanguages(): Array<{ code: string; name: string; nativeName: string }> {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'de', name: 'German', nativeName: 'Deutsch' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
      { code: 'zh', name: 'Chinese', nativeName: '中文' },
      { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    ];
  }

  // Supported Timezones
  getSupportedTimezones(): Array<{ code: string; name: string; offset: string }> {
    return [
      { code: 'UTC', name: 'UTC', offset: 'UTC±0' },
      { code: 'America/New_York', name: 'New York', offset: 'UTC-5' },
      { code: 'America/Los_Angeles', name: 'Los Angeles', offset: 'UTC-8' },
      { code: 'Europe/London', name: 'London', offset: 'UTC+0' },
      { code: 'Europe/Paris', name: 'Paris', offset: 'UTC+1' },
      { code: 'Asia/Kolkata', name: 'Kolkata', offset: 'UTC+5:30' },
      { code: 'Asia/Tokyo', name: 'Tokyo', offset: 'UTC+9' },
      { code: 'Asia/Shanghai', name: 'Shanghai', offset: 'UTC+8' },
    ];
  }

  // Accessibility Helpers
  getScreenReaderLabel(key: string, context?: string): string {
    const label = this.translate(key);
    return context ? `${label} - ${context}` : label;
  }

  getAriaLabel(element: string, action?: string): string {
    const actionText = action ? this.translate(action) : '';
    return actionText ? `${element} - ${actionText}` : element;
  }
}

export const localizationService = new LocalizationService();
export default localizationService;