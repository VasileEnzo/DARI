// src/pages/Inicio.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

type Post = { id: number; title: string; body?: string; created_at?: string };

export default function Inicio({ navigation }: any) {
  const { token, setToken } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const res = await api.get('/posts');
      const list: Post[] = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
      setPosts(list);
    } catch (e: any) {
      console.log('Error cargando posts:', e?.response?.data || e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPosts(); }, []);

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Bienvenido a DARI</Text>

      {!token ? (
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Ir al Login</Text>
        </Pressable>
      ) : (
        <>
          <Pressable style={styles.btn} onPress={() => navigation.navigate('CreatePost')}>
            <Text style={styles.btnText}>Crear post</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnSecondary]}
            onPress={() => setToken(null)}
          >
            <Text style={styles.btnSecondaryText}>Cerrar sesión</Text>
          </Pressable>
        </>
      )}

      <Pressable style={[styles.btn, styles.btnOutline]} onPress={loadPosts}>
        <Text style={styles.btnOutlineText}>Refrescar posts</Text>
      </Pressable>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Cargando posts…</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={posts}
      keyExtractor={(it) => String(it.id)}
      ListHeaderComponent={Header}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('PostDetalle', { id: item.id })}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          {!!item.body && <Text numberOfLines={2} style={styles.cardBody}>{item.body}</Text>}
        </Pressable>
      )}
      ListEmptyComponent={
        <View style={styles.center}><Text>No hay posts todavía</Text></View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },

  btn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: { color: '#fff', fontWeight: '700' },

  btnSecondary: { backgroundColor: '#ef4444' },
  btnSecondaryText: { color: '#fff', fontWeight: '700' },

  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  btnOutlineText: { color: '#2563eb', fontWeight: '700' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  cardBody: { color: '#444' },
});
