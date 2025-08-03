import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  FilterSlippageType,
  PriorityFeeType,
  SlippageType,
  SpeedFeeType,
  TransactionContextHandleSetProps,
  TransactionContextType,
} from '../types';
import {useTranslation} from 'react-i18next';

export const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined);

export const TransactionProvider = ({children}: PropsWithChildren) => {
  const {t} = useTranslation(['common']);

  const [slippage, setSlippage] = useState<SlippageType>('auto');
  const [customSlippage, setCustomSlippage] = useState(20);
  const [speedFee, setSpeedFee] = useState<SpeedFeeType>('auto');
  const [maxSpeedFee, setMaxSpeedFee] = useState(0.01);

  const handleResetTransactionSettings = useCallback(() => {
    setSlippage('auto');
    setCustomSlippage(20);
    setSpeedFee('auto');
    setMaxSpeedFee(0.01);
  }, []);

  const handleSet = useCallback(
    ({
      selectedSlippage,
      customSlippageValue,
      selectedSpeedFee,
      customSpeedFeeValue,
    }: TransactionContextHandleSetProps) => {
      setSlippage(selectedSlippage);
      if (selectedSlippage === 'custom') {
        const numericSlippageValue = parseInt(
          customSlippageValue.replace(',', '.'),
        );
        if (!isNaN(numericSlippageValue)) {
          setCustomSlippage(numericSlippageValue);
        }
      }
      setSpeedFee(selectedSpeedFee);
      if (selectedSpeedFee === 'custom') {
        const numericSpeedFeeValue = parseFloat(
          customSpeedFeeValue.replace(',', '.'),
        );
        if (!isNaN(numericSpeedFeeValue)) {
          setMaxSpeedFee(numericSpeedFeeValue);
        }
      }
    },
    [],
  );

  const getTransactionSettingsValues = useMemo(() => {
    return {
      slippage,
      customSlippage: customSlippage.toString(),
      speedFee,
      maxSpeedFee: maxSpeedFee.toString(),
    };
  }, [slippage, customSlippage, speedFee, maxSpeedFee]);

  const transactionOptions = useMemo(() => {
    let priorityFeeLevel: PriorityFeeType | undefined = 'high';
    if (speedFee === 'custom') {
      priorityFeeLevel = undefined;
    } else {
      switch (speedFee) {
        case 'fast':
          priorityFeeLevel = 'veryHigh';
          break;
        case 'econ':
          priorityFeeLevel = 'low';
          break;
        case 'auto':
          priorityFeeLevel = 'high';
          break;
        default:
          priorityFeeLevel = 'high';
      }
    }

    let transactionSlippage: FilterSlippageType = 'auto';

    if (slippage === 'custom') {
      transactionSlippage = customSlippage;
    } else {
      transactionSlippage = slippage;
    }

    return {
      priorityFeeLevel,
      priorityFee: maxSpeedFee,
      slippage: transactionSlippage,
    };
  }, [speedFee, maxSpeedFee, slippage, customSlippage]);

  const settingsName: {
    label: string;
    value?: FilterSlippageType;
  } = useMemo(() => {
    if (slippage === 'auto' && speedFee === 'auto') {
      return {label: t('common:auto')};
    }

    return {
      label: t('common:custom'),
      value: slippage === 'custom' ? customSlippage : slippage,
    };
  }, [slippage, speedFee, customSlippage, t]);

  const value: TransactionContextType = {
    resetTransactionSettings: handleResetTransactionSettings,
    handleSet,
    getTransactionSettingsValues,
    transactionOptions,
    settingsName,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
