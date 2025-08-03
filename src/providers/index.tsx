import {memo, Suspense, useEffect} from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import i18n from '../localization/i18n';
import RootNavigator from '../navigation/RootNavigator';
import {PageLoading} from '../components';
import ErrorBoundary from '../components/error/ErrorBoundry';
import {SessionProvider} from '../contexts/session';
import DeviceInfo from 'react-native-device-info';
import JailMonkey from 'jail-monkey';

const Providers = () => {
  useEffect(() => {
    const getDeviceData = async () => {
      const isKeyboardConnected = await DeviceInfo.isKeyboardConnected();
      const isMouseConnected = await DeviceInfo.isMouseConnected();
      const deviceType = DeviceInfo.getDeviceType();
      const isEmulator = await DeviceInfo.isEmulator();
      const ipAddress = await DeviceInfo.getIpAddress();
      const deviceName = await DeviceInfo.getDeviceName();

      const isDeviceCompromised = JailMonkey.isJailBroken(); // hem root hem jailbreak
      const isOnEmulator = JailMonkey.isOnExternalStorage(); // bazı emülatörleri yakalayabilir
      const canMockLocation = JailMonkey.canMockLocation(); // konum taklidi yapabilir mi?
      const trustFall = JailMonkey.trustFall(); // güvenlik açığı var mı?
      const isDebuggedMode = await JailMonkey.isDebuggedMode(); // debug modda mı?

      // NOTE: Cihaz güvenlik açıkları kontrol edilecek.
      console.log('Device Info:', {
        isKeyboardConnected,
        isMouseConnected,
        deviceType,
        isEmulator,
        isDeviceCompromised,
        isOnEmulator,
        canMockLocation,
        trustFall,
        ipAddress,
        deviceName,
        isDebuggedMode,
      });

      /**
       * isEmulator => true ise, bağlanmayacak.
       * isOnEmulator => true ise, bağlanmayacak.
       * isDeviceCompromised => true ise, bağlanmayacak.
       * canMockLocation => true ise, bağlanmayacak.
       * trustFall => true ise, bağlanmayacak.
       * ipAdresi alınamazsa bağlanamayacak.
       * deviceType !== 'Handset' ise, bağlanmayacak.
       * isKeyboardConnected => true ise, bağlanmayacak.
       * isMouseConnected => true ise, bağlanmayacak.
       * isDebuggedMode => true ise, bağlanmayacak.
       */
    };

    getDeviceData();
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Suspense fallback={<PageLoading />}>
          <I18nextProvider i18n={i18n}>
            <SessionProvider>
              <RootNavigator />
            </SessionProvider>
          </I18nextProvider>
        </Suspense>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default memo(Providers);
