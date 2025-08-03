import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import bs58 from 'bs58';
import styles from './styles_old';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  BaseButton,
  BlurLoading,
  CheckBox,
  Header,
  KeyboardAvoid,
  LayoutStatusBar,
  Notification,
  PageHeaderCard,
  PortfolioInput,
  PortfolioUserCard,
  SelectPortfolio,
} from '../../../../components';
import {
  AddPortfolioType,
  AppStackScreenProps,
  lockPeriodDays,
} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {addPortfolioSchema} from '../../../../validations/porfolio';
import {useSize} from '../../../../hooks';
import {QRCodeIcon} from '../../../../assets/icons';
import {COLORS} from '../../../../constants/colors';
import {
  copyPortfolioService,
  createPortfolioService,
  getSignMessageService,
  getWalletBalance,
} from '../../../../services';
import {showAlert, showErrorAlert} from '../../../../utils/alert';
import {scaleSize} from '../../../../constants/dimensions';
import {useFocusEffect} from '@react-navigation/native';
import {sign} from 'tweetnacl';
import WalletManager from '../../../../lib/WalletManager';
import {singTransaction} from '../../../../utils';

global.Buffer = Buffer;

const titleProps = {
  fontSize: 20,
  lineHeight: 24,
  letterSpacing: -0.4,
};

const SmallHeader = ({title}: {title: string}) => (
  <PageHeaderCard title={title} {...titleProps} />
);

const BeLeaderScreen = ({navigation}: AppStackScreenProps<'BeLeader'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content', 'errors']);
  const {
    height,
    safeArea: {top},
  } = useSize();

  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [showSelectError, setShowSelectError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  const [balance, setBalance] = useState<number>();

  const [signMessage, setSignMessage] = useState<string>();
  const [signature, setSignature] = useState<string>();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    setValue,
    watch,
  } = useForm<AddPortfolioType>({
    defaultValues: {
      lockPeriod: '7',
      balance: 0,
    },
    resolver: zodResolver(addPortfolioSchema),
  });

  const portfolioType = watch('type');
  const minCopyAmount = watch('minCopyAmount');

  const onSubmit: SubmitHandler<AddPortfolioType> = async data => {
    setCanGoBack(true);
    console.log('Form Data:', data);

    if (signMessage && signature) {
      const postData = {
        signMessage,
        signature,
        ...data,
      };

      console.log('Post Data:', postData);
      console.log('Amount:', parseFloat(data.amount.replace(',', '.')));

      const response = await createPortfolioService(postData);
      console.log('Response from createPortfolioService:', response);

      if (response.status === 'success') {
        // NOTE: Burası gerçek işlem alanı
        // const transaction = await singTransaction(response.data.tx);
        // if (
        //   typeof transaction === 'string' &&
        //   transaction.startsWith('walletManager.')
        // ) {
        //   console.log('Error sign transaction:', transaction);
        //   showAlert('error', t(`errors:${transaction}`));
        // } else {
        //   console.log('Sign transaction successful:', transaction);
        //   const copyResponse = await copyPortfolioService({
        //     poolId: response.data.poolId,
        //     amount: parseFloat(data.amount.replace(',', '.')),
        //     isTrader: true,
        //     tx: transaction,
        //   });

        //   console.log('Copy Portfolio Response:', copyResponse);
        //   if (copyResponse.status === 'success') {
        //     console.log('Copy Portfolio Response:', copyResponse);
        //     navigation.goBack();
        //   } else {
        //     console.log('Copy Portfolio failed:', copyResponse);
        //     showErrorAlert(copyResponse);
        //   }
        // }

        // HACK: Burası transaction olmadan test için açılacak
        const copyResponse = await copyPortfolioService({
          poolId: response.data.poolId,
          amount: parseFloat(data.amount.replace(',', '.')),
          isTrader: true,
          tx: response.data.tx,
        });

        console.log('Copy Portfolio Response:', copyResponse);
        if (copyResponse.status === 'success') {
          console.log('Copy Portfolio Response:', copyResponse);
          navigation.goBack();
        } else {
          console.log('Copy Portfolio failed:', copyResponse);
          showErrorAlert(copyResponse);
        }

        //! Eski transaction yapılan işlem
        // const transaction = await doTransaction(response.data.tx);
        // if (typeof transaction === 'string') {
        //   console.log('Error response:', transaction);
        //   showAlert('error', t(`errors:${transaction}`));
        // } else {
        //   if (transaction.status === 'success') {
        //     console.log('Transaction successful:', transaction);
        //     const copyResponse = await copyPortfolioService({
        //       poolId: response.data.poolId,
        //       amount: Number(data.amount),
        //       isTrader: true,
        //     });

        //     if (copyResponse.status === 'success') {
        //       console.log('Copy Portfolio Response:', copyResponse);
        //       navigation.goBack();
        //     } else {
        //       console.log('Copy Portfolio failed:', copyResponse);
        //       showErrorAlert(copyResponse);
        //     }
        //   } else {
        //     console.log('Transaction failed:', transaction);
        //     showErrorAlert(transaction);
        //   }
        // }

        // NOTE: Burası transaction olmadan test için açılacak
        // const copyResponse = await copyPortfolioService({
        //   poolId: response.data.poolId,
        //   amount: parseFloat(data.amount.replace(',', '.')),
        //   isTrader: true,
        // });
        // console.log('Copy Portfolio Response:', copyResponse);

        // if (copyResponse.status === 'success') {
        //   console.log('Copy Portfolio Response:', copyResponse);
        //   navigation.goBack();
        // } else {
        //   console.log('Copy Portfolio failed:', copyResponse);
        //   showErrorAlert(copyResponse);
        // }
      } else {
        showErrorAlert(response);
      }
    } else {
      showAlert('error', t('errors:unknownError'), [
        {
          text: t('common:close'),
          style: 'cancel',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
    setCanGoBack(false);
  };

  useEffect(() => {
    if (portfolioType === 'public') {
      setValue('code', '');
    }
  }, [portfolioType, setValue]);

  useEffect(() => {
    if (
      minCopyAmount &&
      (minCopyAmount.startsWith(',') || minCopyAmount.startsWith('.'))
    ) {
      setValue('minCopyAmount', '0' + minCopyAmount, {
        shouldValidate: true,
      });
    }
  }, [minCopyAmount, setValue]);

  const containerHeight = useMemo(
    () => height - headerHeight - top - scaleSize(18),
    [height, headerHeight, top],
  );

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !canGoBack,
    });
  }, [navigation, canGoBack]);

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await getWalletBalance();

      if (response.status === 'success') {
        setBalance(response.data);
        setValue('balance', response.data);
      } else {
        showAlert(response.status, response.message, [
          {
            text: t('common:close'),
            style: 'cancel',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    console.log('Sign message state:', signMessage);
  }, [signMessage]);

  const handleFocus = useCallback(() => {
    const getMessage = async () => {
      const response = await getSignMessageService();
      console.log('Sign message response:', response);

      if (response.status === 'success') {
        const message = new TextEncoder().encode(response.data);
        setSignMessage(response.data);
        const keypair = await WalletManager.getWalletSecret();
        console.log('Keypair:', keypair);

        if (keypair.success && keypair.keypair) {
          console.log('Keypair:', keypair);
          const signature = sign.detached(message, keypair.keypair.secretKey);
          const bsSignature = bs58.encode(signature);
          setSignature(bsSignature);
          console.log('Signature:', signature);
        } else {
          console.log('Wallet data not found');
          showAlert('error', t('errors:unknownError'), [
            {
              text: t('common:close'),
              style: 'cancel',
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      } else {
        showErrorAlert(response);
      }
    };
    getMessage();
  }, [getSignMessageService, WalletManager]);

  useFocusEffect(handleFocus);

  return (
    <>
      <LayoutStatusBar />
      <KeyboardAvoid style={{paddingTop: top}}>
        <ScrollView style={[styles.scrollContainer]} bounces={!canGoBack}>
          <Header
            title={t('navigation:beALeaderTrader')}
            onPressBack={() => navigation.goBack()}
            onLayout={event => {
              const {height} = event.nativeEvent.layout;
              setHeaderHeight(height);
            }}
          />
          <View
            style={[
              styles.container,
              contentHeight > containerHeight
                ? styles.flex
                : {minHeight: containerHeight},
            ]}
            onLayout={event => {
              const {height} = event.nativeEvent.layout;
              setContentHeight(height);
            }}>
            <PortfolioUserCard showBio />
            <View style={styles.selectContainer}>
              <View style={styles.selectWrapper}>
                <PageHeaderCard title={t('common:portfolioType')} />
              </View>
              <Controller
                name="type"
                control={control}
                render={({field: {onChange, value}}) => (
                  <>
                    <SelectPortfolio
                      type="public"
                      isSelected={value === 'public'}
                      onPress={() => {
                        setShowSelectError(false);
                        onChange('public');
                      }}
                    />
                    <SelectPortfolio
                      type="private"
                      isSelected={value === 'private'}
                      onPress={() => {
                        setShowSelectError(false);
                        onChange('private');
                      }}
                    />
                  </>
                )}
              />
            </View>

            {portfolioType && (
              <>
                <View style={styles.formContainer}>
                  <View style={styles.formWrapper}>
                    <SmallHeader title={t('common:name')} />
                    <PortfolioInput
                      control={control}
                      name="name"
                      placeholder={t('content:portfolioName')}
                      keyboardType="default"
                      autoCapitalize="words"
                      autoComplete="off"
                      autoCorrect={false}
                    />
                  </View>

                  <View style={styles.formWrapper}>
                    <SmallHeader title={t('common:amount')} />
                    <PortfolioInput
                      control={control}
                      name="amount"
                      placeholder="1 - 1000"
                      trailing={
                        <Text
                          style={[
                            styles.trailingText,
                            styles.trailingBaseText,
                          ]}>
                          SOL -
                          <Text
                            style={[
                              styles.trailingText,
                              styles.trailingPrimaryText,
                            ]}>
                            {' '}
                            Max
                          </Text>
                        </Text>
                      }
                    />
                    <View style={styles.availableContainer}>
                      <Text
                        style={[
                          styles.availableText,
                          styles.availableTextSolid,
                        ]}>
                        {t('common:available')} -{' '}
                        <Text
                          style={[
                            styles.availableText,
                            styles.availableTextWhite,
                          ]}>
                          {balance?.toFixed(balance > 1 ? 4 : 9)} SOL
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View style={styles.formWrapper}>
                    <SmallHeader title={t('content:profitSharing')} />
                    <PortfolioInput
                      placeholder="0 - 30"
                      name="profitShare"
                      control={control}
                      trailing={
                        <Text
                          style={[
                            styles.trailingText,
                            styles.trailingPrimaryText,
                          ]}>
                          %
                        </Text>
                      }
                    />
                    <Text style={[styles.descriptionText]}>
                      {t('content:profitShareDetail')}
                    </Text>
                  </View>

                  <View style={styles.formWrapper}>
                    <SmallHeader title={t('content:minimumCopy')} />
                    <PortfolioInput
                      placeholder="0,1 - 1.000"
                      name="minCopyAmount"
                      control={control}
                      trailing={
                        <Text
                          style={[
                            styles.trailingText,
                            styles.trailingPrimaryText,
                          ]}>
                          SOL
                        </Text>
                      }
                    />
                    <Text style={[styles.descriptionText]}>
                      {t('content:minCopyAmountDetail')}
                    </Text>
                  </View>

                  <View style={styles.formWrapper}>
                    <SmallHeader title={t('content:lockPeriod')} />
                    <Controller
                      name="lockPeriod"
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <View style={styles.lockPeriodContainer}>
                          {lockPeriodDays.map(day => (
                            <TouchableOpacity
                              key={day}
                              onPress={() => onChange(day.toString())}
                              style={[
                                styles.lockPeriodButton,
                                Number(value) === day
                                  ? styles.lockPeriodButtonSelected
                                  : styles.lockPeriodButtonBase,
                              ]}>
                              <Text
                                style={[
                                  styles.lockPeriodText,
                                  Number(value) === day
                                    ? styles.lockPeriodTextSelected
                                    : styles.lockPeriodTextBase,
                                ]}>
                                {t('common:day', {value: day})}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    />
                    <Text style={[styles.descriptionText]}>
                      {t('content:lockPeriodDetail')}
                    </Text>
                  </View>

                  <View style={styles.formWrapper}>
                    <SmallHeader title={t('content:numberOfCopiers')} />
                    <PortfolioInput
                      placeholder="0 - 1.000"
                      name="numberOfCopiers"
                      control={control}
                      trailing={
                        <Text
                          style={[
                            styles.trailingText,
                            styles.trailingPrimaryText,
                          ]}>
                          {t('content:people')}
                        </Text>
                      }
                    />
                    <Text style={[styles.descriptionText]}>
                      {t('content:numberOfCopiersDetail')}
                    </Text>
                  </View>

                  {portfolioType === 'private' && (
                    <View style={styles.formWrapper}>
                      <SmallHeader title={t('content:createCode')} />
                      <PortfolioInput
                        placeholder={t('common:code')}
                        name="code"
                        control={control}
                        autoCapitalize="characters"
                        autoComplete="off"
                        autoCorrect={false}
                        keyboardType="default"
                        trailingIsText={false}
                        trailing={
                          <View style={styles.createCodeContainer}>
                            <TouchableOpacity style={styles.copyCodeButton}>
                              <Text style={styles.copyCodeText}>
                                {t('common:copy')}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <QRCodeIcon color={COLORS.WHITE} />
                            </TouchableOpacity>
                          </View>
                        }
                      />
                      <Text style={[styles.descriptionText]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor.
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.infoContainer}>
                  <PageHeaderCard title={t('common:info')} />
                  <View style={styles.infoCardWrapper}>
                    <View style={styles.infoCard}>
                      <Text style={styles.infoText}>
                        {t('content:portfolioInfoTitle')}
                      </Text>
                    </View>
                    <View style={styles.infoCard}>
                      <Text style={styles.infoText}>
                        {t('content:portfolioInfoDescription1')}
                      </Text>
                      <Text style={styles.infoText}>
                        {t('content:portfolioInfoDescription2')}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}

            <View style={styles.buttonContainer}>
              {(showSelectError ||
                (errors.agreedToAgreement &&
                  errors.agreedToAgreement.message)) && (
                <View style={styles.errorWrapper}>
                  <Notification
                    type="error"
                    message={
                      showSelectError
                        ? t('errors:mustSelectFirstPortfolio')
                        : ((errors.agreedToAgreement &&
                            errors.agreedToAgreement.message) ??
                          '')
                    }
                  />
                </View>
              )}
              <Controller
                name="agreedToAgreement"
                control={control}
                render={({field: {onChange, value}}) => (
                  <CheckBox
                    isSelected={value}
                    onPress={() => {
                      if (!portfolioType) {
                        setShowSelectError(true);
                      } else {
                        onChange(!value);
                      }
                    }}>
                    <Text
                      style={[styles.checkBoxText, styles.checkBoxTextSolid]}>
                      {t('content:portfolioReadAndAgree')}
                    </Text>
                    <Text
                      style={[styles.checkBoxText, styles.checkBoxTextWhite]}
                      onPress={() => {
                        console.log('Navigate to User Service Agreement');
                      }}>
                      {t('content:userServiceAgreement')}
                    </Text>
                  </CheckBox>
                )}
              />
              <BaseButton
                disabled={!portfolioType || isSubmitting || canGoBack}
                label={t('common:copy')}
                onPress={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoid>
    </>
  );
  // return (
  //   <KeyboardAvoid style={{paddingTop: top}}>
  //     <LayoutStatusBar />
  //     <ScrollView style={[styles.scrollContainer]} bounces={!canGoBack}>
  //       {canGoBack && <BlurLoading />}
  //       <LayoutStatusBar />
  //       <Header
  //         title={t('navigation:beALeaderTrader')}
  //         onPressBack={() => navigation.goBack()}
  //         onLayout={event => {
  //           const {height} = event.nativeEvent.layout;
  //           setHeaderHeight(height);
  //         }}
  //       />
  //       <View
  //         style={[
  //           styles.container,
  //           contentHeight > containerHeight
  //             ? styles.flex
  //             : {minHeight: containerHeight},
  //         ]}
  //         onLayout={event => {
  //           const {height} = event.nativeEvent.layout;
  //           setContentHeight(height);
  //         }}>
  //         <PortfolioUserCard showBio />
  //         <View style={styles.selectContainer}>
  //           <View style={styles.selectWrapper}>
  //             <PageHeaderCard title={t('common:portfolioType')} />
  //           </View>
  //           <Controller
  //             name="type"
  //             control={control}
  //             render={({field: {onChange, value}}) => (
  //               <>
  //                 <SelectPortfolio
  //                   type="public"
  //                   isSelected={value === 'public'}
  //                   onPress={() => {
  //                     setShowSelectError(false);
  //                     onChange('public');
  //                   }}
  //                 />
  //                 <SelectPortfolio
  //                   type="private"
  //                   isSelected={value === 'private'}
  //                   onPress={() => {
  //                     setShowSelectError(false);
  //                     onChange('private');
  //                   }}
  //                 />
  //               </>
  //             )}
  //           />
  //         </View>

  //         {portfolioType && (
  //           <>
  //             <View style={styles.formContainer}>
  //               <View style={styles.formWrapper}>
  //                 <SmallHeader title={t('common:name')} />
  //                 <PortfolioInput
  //                   control={control}
  //                   name="name"
  //                   placeholder={t('content:portfolioName')}
  //                   keyboardType="default"
  //                   autoCapitalize="words"
  //                   autoComplete="off"
  //                   autoCorrect={false}
  //                 />
  //               </View>

  //               <View style={styles.formWrapper}>
  //                 <SmallHeader title={t('common:amount')} />
  //                 <PortfolioInput
  //                   control={control}
  //                   name="amount"
  //                   placeholder="1 - 1000"
  //                   trailing={
  //                     <Text
  //                       style={[styles.trailingText, styles.trailingBaseText]}>
  //                       SOL -
  //                       <Text
  //                         style={[
  //                           styles.trailingText,
  //                           styles.trailingPrimaryText,
  //                         ]}>
  //                         {' '}
  //                         Max
  //                       </Text>
  //                     </Text>
  //                   }
  //                 />
  //                 <View style={styles.availableContainer}>
  //                   <Text
  //                     style={[styles.availableText, styles.availableTextSolid]}>
  //                     {t('common:available')} -{' '}
  //                     <Text
  //                       style={[
  //                         styles.availableText,
  //                         styles.availableTextWhite,
  //                       ]}>
  //                       {balance?.toFixed(balance > 1 ? 4 : 9)} SOL
  //                     </Text>
  //                   </Text>
  //                 </View>
  //               </View>

  //               <View style={styles.formWrapper}>
  //                 <SmallHeader title={t('content:profitSharing')} />
  //                 <PortfolioInput
  //                   placeholder="0 - 30"
  //                   name="profitShare"
  //                   control={control}
  //                   trailing={
  //                     <Text
  //                       style={[
  //                         styles.trailingText,
  //                         styles.trailingPrimaryText,
  //                       ]}>
  //                       %
  //                     </Text>
  //                   }
  //                 />
  //                 <Text style={[styles.descriptionText]}>
  //                   {t('content:profitShareDetail')}
  //                 </Text>
  //               </View>

  //               <View style={styles.formWrapper}>
  //                 <SmallHeader title={t('content:minimumCopy')} />
  //                 <PortfolioInput
  //                   placeholder="0,1 - 1.000"
  //                   name="minCopyAmount"
  //                   control={control}
  //                   trailing={
  //                     <Text
  //                       style={[
  //                         styles.trailingText,
  //                         styles.trailingPrimaryText,
  //                       ]}>
  //                       SOL
  //                     </Text>
  //                   }
  //                 />
  //                 <Text style={[styles.descriptionText]}>
  //                   {t('content:minCopyAmountDetail')}
  //                 </Text>
  //               </View>

  //               <View style={styles.formWrapper}>
  //                 <SmallHeader title={t('content:lockPeriod')} />
  //                 <Controller
  //                   name="lockPeriod"
  //                   control={control}
  //                   render={({field: {onChange, value}}) => (
  //                     <View style={styles.lockPeriodContainer}>
  //                       {lockPeriodDays.map(day => (
  //                         <TouchableOpacity
  //                           key={day}
  //                           onPress={() => onChange(day.toString())}
  //                           style={[
  //                             styles.lockPeriodButton,
  //                             Number(value) === day
  //                               ? styles.lockPeriodButtonSelected
  //                               : styles.lockPeriodButtonBase,
  //                           ]}>
  //                           <Text
  //                             style={[
  //                               styles.lockPeriodText,
  //                               Number(value) === day
  //                                 ? styles.lockPeriodTextSelected
  //                                 : styles.lockPeriodTextBase,
  //                             ]}>
  //                             {t('common:day', {value: day})}
  //                           </Text>
  //                         </TouchableOpacity>
  //                       ))}
  //                     </View>
  //                   )}
  //                 />
  //                 <Text style={[styles.descriptionText]}>
  //                   {t('content:lockPeriodDetail')}
  //                 </Text>
  //               </View>

  //               <View style={styles.formWrapper}>
  //                 <SmallHeader title={t('content:numberOfCopiers')} />
  //                 <PortfolioInput
  //                   placeholder="0 - 1.000"
  //                   name="numberOfCopiers"
  //                   control={control}
  //                   trailing={
  //                     <Text
  //                       style={[
  //                         styles.trailingText,
  //                         styles.trailingPrimaryText,
  //                       ]}>
  //                       {t('content:people')}
  //                     </Text>
  //                   }
  //                 />
  //                 <Text style={[styles.descriptionText]}>
  //                   {t('content:numberOfCopiersDetail')}
  //                 </Text>
  //               </View>

  //               {portfolioType === 'private' && (
  //                 <View style={styles.formWrapper}>
  //                   <SmallHeader title={t('content:createCode')} />
  //                   <PortfolioInput
  //                     placeholder={t('common:code')}
  //                     name="code"
  //                     control={control}
  //                     autoCapitalize="characters"
  //                     autoComplete="off"
  //                     autoCorrect={false}
  //                     keyboardType="default"
  //                     trailingIsText={false}
  //                     trailing={
  //                       <View style={styles.createCodeContainer}>
  //                         <TouchableOpacity style={styles.copyCodeButton}>
  //                           <Text style={styles.copyCodeText}>
  //                             {t('common:copy')}
  //                           </Text>
  //                         </TouchableOpacity>
  //                         <TouchableOpacity>
  //                           <QRCodeIcon color={COLORS.WHITE} />
  //                         </TouchableOpacity>
  //                       </View>
  //                     }
  //                   />
  //                   <Text style={[styles.descriptionText]}>
  //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  //                     sed do eiusmod tempor.
  //                   </Text>
  //                 </View>
  //               )}
  //             </View>

  //             <View style={styles.infoContainer}>
  //               <PageHeaderCard title={t('common:info')} />
  //               <View style={styles.infoCardWrapper}>
  //                 <View style={styles.infoCard}>
  //                   <Text style={styles.infoText}>
  //                     {t('content:portfolioInfoTitle')}
  //                   </Text>
  //                 </View>
  //                 <View style={styles.infoCard}>
  //                   <Text style={styles.infoText}>
  //                     {t('content:portfolioInfoDescription1')}
  //                   </Text>
  //                   <Text style={styles.infoText}>
  //                     {t('content:portfolioInfoDescription2')}
  //                   </Text>
  //                 </View>
  //               </View>
  //             </View>
  //           </>
  //         )}

  //         <View style={styles.buttonContainer}>
  //           {(showSelectError ||
  //             (errors.agreedToAgreement &&
  //               errors.agreedToAgreement.message)) && (
  //             <View style={styles.errorWrapper}>
  //               <Notification
  //                 type="error"
  //                 message={
  //                   showSelectError
  //                     ? t('errors:mustSelectFirstPortfolio')
  //                     : ((errors.agreedToAgreement &&
  //                         errors.agreedToAgreement.message) ??
  //                       '')
  //                 }
  //               />
  //             </View>
  //           )}
  //           <Controller
  //             name="agreedToAgreement"
  //             control={control}
  //             render={({field: {onChange, value}}) => (
  //               <CheckBox
  //                 isSelected={value}
  //                 onPress={() => {
  //                   if (!portfolioType) {
  //                     setShowSelectError(true);
  //                   } else {
  //                     onChange(!value);
  //                   }
  //                 }}>
  //                 <Text style={[styles.checkBoxText, styles.checkBoxTextSolid]}>
  //                   {t('content:portfolioReadAndAgree')}
  //                 </Text>
  //                 <Text
  //                   style={[styles.checkBoxText, styles.checkBoxTextWhite]}
  //                   onPress={() => {
  //                     console.log('Navigate to User Service Agreement');
  //                   }}>
  //                   {t('content:userServiceAgreement')}
  //                 </Text>
  //               </CheckBox>
  //             )}
  //           />
  //           <BaseButton
  //             disabled={!portfolioType || isSubmitting || canGoBack}
  //             label={t('common:copy')}
  //             onPress={handleSubmit(onSubmit)}
  //             isLoading={isSubmitting}
  //           />
  //         </View>
  //       </View>
  //     </ScrollView>
  //   </KeyboardAvoid>
  // );
};

export default memo(BeLeaderScreen);
