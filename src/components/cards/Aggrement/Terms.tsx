import {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import DotText from './DotText';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WIDI Terms & Conditions</Text>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>1. Introduction</Text>
        <Text style={styles.itemText}>
          These Terms & Conditions (“Terms”) govern your use of the WIDI copy
          trading application (“Service”) provided by Gig Hub Ltd (“we”, “us”,
          “our”). By accessing or using the Service, you agree to these Terms.
          The Service enables users to perform trading operations involving
          cryptocurrencies on the Solana blockchain.
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>2. Service Description</Text>
        <Text style={styles.itemText}>
          WIDI offers a copy trading platform allowing users to buy, sell, and
          copy trades of cryptocurrencies operating on the Solana blockchain via
          a mobile application.
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>3. Investment Risks</Text>
        <DotText>
          <Text style={styles.itemText}>
            Users acknowledge and accept full responsibility for all investment
            decisions made using the Service.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            WIDI does not provide, and explicitly disclaims, any investment
            advice or recommendations.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            Cryptocurrency markets are highly volatile; investments may result
            in partial or total loss of capital.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            Users should carefully assess their risk tolerance before engaging
            in any trading activity.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>4. User Account and Security</Text>
        <DotText>
          <Text style={styles.itemText}>
            Users are responsible for maintaining the confidentiality of their
            account credentials.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            You are solely responsible for all activities that occur under your
            account.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We are not liable for any unauthorized access or losses resulting
            from failure to safeguard your credentials.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>5. Data Privacy</Text>
        <DotText>
          <Text style={styles.itemText}>
            Personal data collected through the Service is securely stored in
            our databases.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We do not share your personal information with any third parties.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We comply with applicable data protection regulations, including but
            not limited to Turkish data protection laws.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>6. Intellectual Property</Text>
        <DotText>
          <Text style={styles.itemText}>
            All intellectual property rights related to WIDI’s platform,
            software, branding, and content belong to Gig Hub Ltd.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            Users are granted a limited license for personal use only and may
            not reproduce, distribute, or modify the Service for commercial
            purposes without prior consent.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>7. Terms of Use</Text>
        <DotText>
          <Text style={styles.itemText}>
            We strive to provide uninterrupted access to the Service but do not
            guarantee continuous or error-free operation.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We are not liable for any damages or losses resulting from technical
            issues or Service interruptions.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We reserve the right to update or modify these Terms at any time
            without prior notice.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>8. Disclaimer of Liability</Text>
        <DotText>
          <Text style={styles.itemText}>
            The Service integrates with third-party platforms such as Solana
            blockchain and various exchanges. We are not responsible for issues
            or losses arising from these third-party services.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            WIDI does not endorse or guarantee the accuracy of any investment
            strategies or trading outcomes.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>9. Contact Information</Text>
        <Text style={styles.itemText}>
          For any inquiries, support, or feedback:
        </Text>
        <Text style={[styles.itemText, styles.itemTextBold]}>Gig Hub Ltd</Text>
        <Text style={styles.itemText}>Email: admin@widit.fun</Text>
        <Text style={styles.itemText}>Country of Origin: Turkey</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>10. Governing Law and Amendments</Text>
        <DotText>
          <Text style={styles.itemText}>
            These Terms shall be governed by and construed in accordance with
            the laws of Turkey.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We may amend these Terms from time to time by posting updated
            versions. Continued use of the Service constitutes acceptance of the
            revised Terms.
          </Text>
        </DotText>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>
          11. Wallet Management and User Data
        </Text>
        <DotText>
          <Text style={styles.itemText}>
            Users sign up using their Twitter accounts and receive a crypto
            wallet within the WIDI app upon registration.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            The private keys of these wallets are generated and stored
            exclusively on the user’s device; Gig Hub Ltd has{' '}
            <Text style={[styles.itemText, styles.itemTextBold]}>
              no access
            </Text>{' '}
            to these private keys and{' '}
            <Text style={[styles.itemText, styles.itemTextBold]}>
              does not store them
            </Text>{' '}
            in any database.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            After signing up with their Twitter account, users are provided with
            a{' '}
            <Text style={[styles.itemText, styles.itemTextBold]}>
              WIDI Access Code,
            </Text>{' '}
            a unique code separate from the private key, which they must
            securely copy and keep. This Access Code enables users to access
            their accounts from other mobile devices while ensuring that private
            keys are never stored on our servers. This design protects user
            wallets by preventing even Gig Hub Ltd from accessing them.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            We do not collect or store any personal information other than
            biometric data (if used) and Twitter account linkage data.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            Users are fully responsible for securing their private keys and
            backing them up. Loss of private keys means loss of access to the
            wallet and assets, and WIDI cannot recover them.
          </Text>
        </DotText>
        <DotText>
          <Text style={styles.itemText}>
            The WIDI app does not manage or control your wallet or digital
            assets in any way.
          </Text>
        </DotText>
      </View>
    </View>
  );
};

export default memo(PrivacyPolicy);
