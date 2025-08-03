import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ShimmerSkeleton from './Shimmer';

const SkeletonExamples: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Skeleton Component Examples</Text>
      
      {/* Text Skeleton */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Skeletons</Text>
        <ShimmerSkeleton variant="text" width="80%" height={16} />
        <View style={styles.spacer} />
        <ShimmerSkeleton variant="text" width="60%" height={16} />
        <View style={styles.spacer} />
        <ShimmerSkeleton variant="text" width="90%" height={16} />
      </View>

      {/* Avatar Skeleton */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avatar Skeleton</Text>
        <View style={styles.row}>
          <ShimmerSkeleton variant="avatar" />
          <View style={styles.textGroup}>
            <ShimmerSkeleton variant="text" width={120} height={16} />
            <View style={styles.spacer} />
            <ShimmerSkeleton variant="text" width={80} height={12} />
          </View>
        </View>
      </View>

      {/* Card Skeleton */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Card Skeleton</Text>
        <ShimmerSkeleton variant="card" width="100%" height={200} />
        <View style={styles.spacer} />
        <ShimmerSkeleton variant="text" width="70%" height={18} />
        <View style={styles.spacer} />
        <ShimmerSkeleton variant="text" width="50%" height={14} />
      </View>

      {/* Circular Skeleton */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Circular Skeletons</Text>
        <View style={styles.row}>
          <ShimmerSkeleton variant="circular" height={40} />
          <ShimmerSkeleton variant="circular" height={60} />
          <ShimmerSkeleton variant="circular" height={80} />
        </View>
      </View>

      {/* Rectangular Skeleton */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rectangular Skeletons</Text>
        <ShimmerSkeleton variant="rectangular" width="100%" height={100} />
        <View style={styles.spacer} />
        <View style={styles.row}>
          <ShimmerSkeleton variant="rectangular" width={100} height={80} />
          <ShimmerSkeleton variant="rectangular" width={100} height={80} />
          <ShimmerSkeleton variant="rectangular" width={100} height={80} />
        </View>
      </View>

      {/* Custom Children Skeleton */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Layout Skeleton</Text>
        <ShimmerSkeleton>
          <View style={styles.customLayout}>
            <View style={styles.customAvatar} />
            <View style={styles.customContent}>
              <View style={styles.customTitle} />
              <View style={styles.customSubtitle} />
              <View style={styles.customDescription} />
            </View>
          </View>
        </ShimmerSkeleton>
      </View>

      {/* List Item Skeleton */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>List Item Skeletons</Text>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.listItem}>
            <ShimmerSkeleton variant="circular" height={50} />
            <View style={styles.listContent}>
              <ShimmerSkeleton variant="text" width="70%" height={16} />
              <View style={styles.spacer} />
              <ShimmerSkeleton variant="text" width="50%" height={12} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  spacer: {
    height: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  textGroup: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 15,
  },
  listContent: {
    flex: 1,
  },
  customLayout: {
    flexDirection: 'row',
    padding: 15,
    gap: 15,
  },
  customAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
  },
  customContent: {
    flex: 1,
    gap: 8,
  },
  customTitle: {
    height: 20,
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  customSubtitle: {
    height: 16,
    width: '60%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  customDescription: {
    height: 14,
    width: '90%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default SkeletonExamples;
