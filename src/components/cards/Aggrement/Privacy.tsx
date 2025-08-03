import {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import DotText from './DotText';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WIDI Privacy Policy</Text>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>1. Introduction</Text>
        <Text style={styles.itemText}>
          Gig Hub Ltd (“we”, “us”, “our”) operates the WIDI copy trading
          application (“Service”). This Privacy Policy explains how we collect,
          use, and protect your personal information when you use our Service.
          By using the Service, you agree to this policy.
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>2. Information We Collect</Text>
        <Text style={styles.itemText}>We collect:</Text>
        <DotText>
          <Text style={styles.itemText}>
            Information you provide via Twitter login and related account
            linkage
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            Usage data such as transaction records, device info, and IP
            addresses
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            Cookies or similar tech for analytics and improving user experience
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>3. Embedded Wallets in WIDI</Text>
        <DotText>
          <Text style={styles.itemText}>
            Wallet private keys are created and stored only on your device.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We do not have access to or store your private keys.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            You must back up your private keys securely; we cannot recover lost
            keys.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            If the wallet service stops, you can still access your assets with
            your backup keys.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>4. How We Use Your Data</Text>
        <DotText>
          <Text style={styles.itemText}>
            To provide and improve the Service
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            To manage accounts and process transactions
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            To communicate updates or respond to inquiries
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            To maintain security and prevent fraud
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>5. Data Sharing</Text>
        <DotText>
          <Text style={styles.itemText}>
            We do not sell or rent your personal data.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We may share info with trusted partners under confidentiality
            agreements.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We may disclose data as required by law.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>6. Data Security and Retention</Text>
        <DotText>
          <Text style={styles.itemText}>
            We protect your data with industry-standard measures.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            Data is retained only as long as necessary and securely deleted
            thereafter.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>7. Your Rights</Text>
        <Text style={styles.itemText}>
          You may have rights to access, correct, or delete your data, depending
          on your jurisdiction. Contact us at admin@widit.fun for requests.
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>8. Children’s Privacy</Text>
        <Text style={styles.itemText}>
          Our Service is not intended for individuals under 18. We do not
          knowingly collect data from children.
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>9. Changes to This Policy</Text>
        <Text style={styles.itemText}>
          We may update this policy; updates are effective when posted.
          Continued use means acceptance.
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>10. Contact Us</Text>
        <Text style={styles.itemText}>Questions? Contact us at:</Text>
        <Text style={[styles.itemText, styles.itemTextBold]}>Gig Hub Ltd</Text>
        <Text style={styles.itemText}>Email: admin@widit.fun</Text>
        <Text style={styles.itemText}>Country: Turkey</Text>
      </View>
    </View>
  );
};

export default memo(PrivacyPolicy);
