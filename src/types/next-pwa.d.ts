declare module 'next-pwa' {
    import { NextConfig } from 'next';
  
    interface PWAConfig {
      dest?: string;
      disable?: boolean;
      register?: boolean;
      skipWaiting?: boolean;
      buildExcludes?: Array<string | RegExp>;
      publicExcludes?: string[];
    }
  
    declare function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
    export default withPWA;
  }