import {memo, useRef} from 'react';
import styles from './styles';
import {
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scaleSize} from '../../../constants/dimensions';
import {CancelCircleIcon} from '../../../assets/icons';
import {NOTIFICATION} from '../../../constants/colors';

const NotificationCard = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const isOpened = useRef(false);

  const baseSize = scaleSize(58);
  const maxStretchSize = scaleSize(120);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => {
        // Sadece yatay hareket varsa ve dikey hareket çok azsa gesture'ı yakala
        const horizontalMovement = Math.abs(gestureState.dx);
        const verticalMovement = Math.abs(gestureState.dy);

        // Minimum hareket eşiği ve yön kontrolü
        return (
          horizontalMovement > 15 && horizontalMovement > verticalMovement * 3
        );
      },

      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Daha katı kontroller ile yanlış gesture yakalamayı önle
        const horizontalMovement = Math.abs(gestureState.dx);
        const verticalMovement = Math.abs(gestureState.dy);

        // Kart açıkken sağa doğru hareket veya kart kapalıyken sola doğru hareket
        const validDirection =
          (isOpened.current && gestureState.dx > 0) || // Açıkken sağa
          (!isOpened.current && gestureState.dx < 0); // Kapalıyken sola

        return (
          horizontalMovement > scaleSize(15) &&
          horizontalMovement > verticalMovement * 3 &&
          validDirection
        );
      },

      onPanResponderGrant: () => {
        // Gesture başladığında mevcut animasyonu durdur
        translateX.stopAnimation();
      },

      onPanResponderMove: (_, gestureState) => {
        if (isOpened.current && gestureState.dx > 0) {
          // Kart açıkken sağa doğru hareket - kapatma işlemi
          const dampingFactor = 0.8; // Hareket hızını %80'e düşür
          const newValue = Math.min(
            gestureState.dx * dampingFactor - baseSize,
            0,
          );
          translateX.setValue(newValue);
        } else if (!isOpened.current && gestureState.dx < 0) {
          // Kart kapalıyken sola doğru hareket - açma işlemi
          // Genişleme animasyonu için daha fazla kaydırma izni ver
          const maxStretch = -maxStretchSize; // Maksimum genişleme mesafesi
          const buttonWidth = -baseSize; // Normal button genişliği

          if (gestureState.dx >= buttonWidth) {
            // Normal aralıkta doğrudan hareket
            translateX.setValue(gestureState.dx);
          } else {
            // Button genişliğini aştıktan sonra resistance (direnç) uygula
            const overStretch = gestureState.dx - buttonWidth;
            const resistance = 0.4; // Direnç faktörü
            const dampedOverStretch = overStretch * resistance;
            const newValue = Math.max(
              buttonWidth + dampedOverStretch,
              maxStretch,
            );
            translateX.setValue(newValue);
          }
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const velocityThreshold = 0.5; // Hız eşiği
        const isQuickSwipe = Math.abs(gestureState.vx) > velocityThreshold;

        if (
          isOpened.current &&
          (gestureState.dx > scaleSize(20) ||
            (isQuickSwipe && gestureState.vx > 0))
        ) {
          // Kart açıkken sağa doğru yeterince kaydırıldıysa veya hızlı sağa swipe yapıldıysa kapat
          isOpened.current = false;
          // Hızlı swipe için daha yumuşak animasyon
          if (isQuickSwipe) {
            Animated.timing(translateX, {
              toValue: 0,
              duration: 300, // Daha uzun süre
              useNativeDriver: true,
            }).start();
          } else {
            Animated.spring(translateX, {
              toValue: 0,
              tension: 80, // Daha düşük tension
              friction: 10, // Daha yüksek friction
              useNativeDriver: true,
            }).start();
          }
        } else if (
          !isOpened.current &&
          (gestureState.dx < scaleSize(-30) ||
            (isQuickSwipe && gestureState.vx < 0))
        ) {
          // Kart kapalıyken sola doğru yeterince kaydırıldıysa veya hızlı sola swipe yapıldıysa aç
          isOpened.current = true;
          // Genişleme sonrası normal button pozisyonuna animate et
          if (isQuickSwipe) {
            Animated.timing(translateX, {
              toValue: -baseSize,
              duration: 350, // Biraz daha uzun süre
              useNativeDriver: true,
            }).start();
          } else {
            // Spring animasyon ile elastik geri dönüş
            Animated.spring(translateX, {
              toValue: -baseSize,
              tension: 120,
              friction: 8,
              useNativeDriver: true,
            }).start();
          }
        } else {
          // Yeterli hareket yoksa mevcut duruma göre pozisyonu ayarla
          if (isOpened.current) {
            // Açık durumuna geri getir - elastik animasyon
            Animated.spring(translateX, {
              toValue: -baseSize,
              tension: maxStretchSize,
              friction: 8,
              useNativeDriver: true,
            }).start();
          } else {
            // Kapalı durumuna geri getir - daha yumuşak animasyon
            Animated.spring(translateX, {
              toValue: 0,
              tension: 100,
              friction: 10,
              useNativeDriver: true,
            }).start();
          }
        }
      },

      onPanResponderTerminate: () => {
        // Gesture kesintiye uğrarsa pozisyonu sıfırla - daha yumuşak animasyon
        if (isOpened.current) {
          Animated.spring(translateX, {
            toValue: -baseSize,
            tension: 80,
            friction: 10,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            tension: 80,
            friction: 10,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleDelete = () => {
    isOpened.current = false;
    Animated.spring(translateX, {
      toValue: 0,
      tension: 80,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handleCardPress = () => {
    // Kart açıksa kapat - daha yumuşak animasyon
    if (isOpened.current) {
      isOpened.current = false;
      Animated.spring(translateX, {
        toValue: 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <CancelCircleIcon
            width={scaleSize(18)}
            height={scaleSize(18)}
            color={NOTIFICATION.DANGER.TEXT}
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.wrapper, {transform: [{translateX}]}]}>
        <TouchableOpacity
          style={styles.cardContent}
          onPress={handleCardPress}
          activeOpacity={1}>
          <View style={[styles.imageSize, styles.imageContainer]} />
          <View style={styles.detailContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Deposit Received</Text>
              <Text style={styles.titleTime}>9:30 PM</Text>
            </View>
            <Text style={styles.descriptionText}>
              15% profit in 24 hours — your favourite trader is on fire. 🔥
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default memo(NotificationCard);
