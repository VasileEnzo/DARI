// src/pages/CrearPost.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { api } from '../services/api';

type Option = { id:number; name:string };

export default function CrearPost({ navigation }: { navigation:any }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [categories, setCategories] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [stateId, setStateId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [catRes, stRes] = await Promise.all([
          api.get('/categories'),
          api.get('/states'),
        ]);
        setCategories(catRes.data?.data ?? catRes.data ?? []);
        setStates(stRes.data?.data ?? stRes.data ?? []);
      } catch (e:any) {
        console.log('Error cargando opciones', e?.response?.data || e?.message);
        Alert.alert('Error', 'No se pudieron cargar categorías/estados');
      } finally {
        setLoadingOptions(false);
      }
    })();
  }, []);

  const onSubmit = async () => {
    if (!title.trim()) return Alert.alert('Ups', 'El título es obligatorio');
    if (!body.trim()) return Alert.alert('Ups', 'El contenido es obligatorio');
    if (!categoryId) return Alert.alert('Ups', 'Seleccioná una categoría');
    if (!stateId) return Alert.alert('Ups', 'Seleccioná un estado');

    const payload = {
      title: title.trim(),
      body: body.trim(),
      category_id: categoryId,
      state_id: stateId,
    };

    try {
      setLoading(true);
      await api.post('/posts', payload);
      Alert.alert('Listo', 'Post creado correctamente');
      navigation.goBack();
    } catch (err:any) {
      console.log('Error creando post:', err?.response?.data || err?.message);
      const msg = err?.response?.data?.message || 'Error al crear el post';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  if (loadingOptions) {
    return (
      <View style={[styles.container, {justifyContent:'center'}]}>
        <ActivityIndicator />
        <Text style={{textAlign:'center', marginTop:8}}>Cargando opciones…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Contenido"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={categoryId}
          onValueChange={(val) => setCategoryId(val)}
        >
          <Picker.Item label="Seleccionar…" value={undefined} />
          {categories.map(c => (
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Estado</Text>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={stateId}
          onValueChange={(val) => setStateId(val)}
        >
          <Picker.Item label="Seleccionar…" value={undefined} />
          {states.map(s => (
            <Picker.Item key={s.id} label={s.name} value={s.id} />
          ))}
        </Picker>
      </View>

      <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator/> : <Text style={styles.buttonText}>Publicar</Text>}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12, backgroundColor:'#fff' },
  multiline: { height: 140 },
  label: { marginTop: 6, marginBottom: 4, fontWeight: '600' },
  pickerWrap: { borderWidth:1, borderColor:'#ccc', borderRadius:8, marginBottom:12, overflow:'hidden', backgroundColor:'#fff' },
  button: { backgroundColor:'#2563eb', padding:14, borderRadius:10, alignItems:'center', marginTop:4 },
  buttonText: { color:'#fff', fontWeight:'bold' },
});
