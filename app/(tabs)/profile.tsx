import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import * as Progress from 'react-native-progress';

// Informacion del Usuario registrado tambien simulado
const UserDashboard = () => {
  const user = {
    name: 'Nombre de Usuario',
    role: 'Colaborador Coppel',
    records: 42,
    distance: '1,250 km',
    bonusProgress: 0.65, // 65%
    totalBonus: '$1,950'
  };

  // Iformacion para simular el registro de las PyMes
  const pymesData = [
    {
      id: 'EMP001',
      regNumber: 'REG2023001',
      name: 'Tech Solutions SA',
      owner: 'Juan Pérez',
      phone: '555-123-4567',
      email: 'juan@techsolutions.com',
      verified: true
    },
    {
      id: 'EMP001',
      regNumber: 'REG2023002',
      name: 'Dulces María',
      owner: 'María González',
      phone: '555-987-6543',
      email: 'maria@dulcesmaria.com',
      verified: false
    },
    {
      id: "EMP001",
      regNumber: "REG2024010",
      name: "Confitería Delicias",
      owner: "Juan Pérez",
      phone: "555-123-4567",
      email: "juan@delicias.com",
      verified: true
    },
    {
      id: "EMP001",
      regNumber: "REG2024011",
      name: "Chocolates La Estrella",
      owner: "Ana Rodríguez",
      phone: "555-765-4321",
      email: "ana@laestrella.com",
      verified: false
    },
    {
      id: "EMP001",
      regNumber: "REG2024012",
      name: "Caramelos Fiesta",
      owner: "Carlos López",
      phone: "555-333-2222",
      email: "carlos@fiesta.com",
      verified: true
    }
  ];

  //Nota1: para colocar estilos a los componentes de react native se escribe style={styles.nombreDelEstilo}
  return (
    <ScrollView style={styles.container}>
      {/* Perfil de usuario */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitial}>C</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.userName}>{user.name}</Text> {/* La terminacion del user.name pues toma los valores la constante user que hice como simulacion*/}
            <Text style={styles.userRole}>{user.role}</Text> {/* La terminacion del user.role toma los valores la constante user que hice como simulacion en este caso el rol del empleado*/}
          </View>
        </View>

        {/* Resumen de los registros */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Resumen</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Registros:</Text>
            <Text style={styles.summaryValue}>{user.records}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Distancia recorrida:</Text>
            <Text style={styles.summaryValue}>{user.distance}</Text>
          </View>
        </View>

        {/* Barra de progreso equivalente a los bonus obtenidos */}
        <View style={styles.bonusSection}>
          <Text style={styles.sectionTitle}>Total del Bono Coppel:</Text>
          <Text style={styles.bonusAmount}>{user.totalBonus}</Text>
          <Progress.Bar
            progress={user.bonusProgress}
            width={300}
            height={20}
            color="#E31937"
            borderRadius={10}
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>{Math.round(user.bonusProgress * 100)}% completado</Text> {/* La terminacion del user.bonusProgress toma los valores la constante user que hice como simulacion los multiplica por 100 para representar un valor entero como en este caso 65%*/}
        </View>

        {/* Subir INE o identificacion en caso de ser necesario */}
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Subir identificación</Text>
        </TouchableOpacity>
      </View>

      {/* Registros de las PyMes */}
      <View style={styles.tableSection}>
        <Text style={styles.sectionTitle}>Registros de PyMEs</Text>
        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>
              <Text style={styles.headerText}>ID</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerText}>Registro</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerText}>Empresa</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerText}>Dueño</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerText}>Télefono</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerText}>Email</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.headerText}>Verificado</Text>
            </DataTable.Title>
          </DataTable.Header>
          {/* Creo la tabla donde almacena los datos que como forma previa los muestre simulados*/}

          {pymesData.map((pyme, index) => (
            <DataTable.Row key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}> {/* Alterna el color de las filas de la tabla para que se vea mejor*/}
              <DataTable.Title>
                <Text style={styles.cellText}>{pyme.id}</Text>{/*Lo mismo que lo de usaurio pero ahora obteniendo los datos de los registros de las PyMes*/}
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.cellText}>{pyme.regNumber}</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.cellText}>{pyme.name}</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.cellText}>{pyme.owner}</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.cellText}>{pyme.phone}</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.cellText}>{pyme.email}</Text>
              </DataTable.Title>
              <DataTable.Cell>
                <Text style={styles.cellText}>{pyme.verified ? '✅' : '❌'}</Text> {/*Si la verificacion es True es palomita si es False tacha*/}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#E31937', // Borde izquierdo rojo Coppel
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    backgroundColor: '#005BAF', // Azul Coppel
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  profileText: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Gris oscuro Coppel
  },
  userRole: {
    fontSize: 16,
    color: '#E31937', // Rojo Coppel
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005BAF', // Azul Coppel
    marginBottom: 10,
  },
  summarySection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333', // Gris oscuro Coppel
  },
  bonusSection: {
    marginBottom: 20,
  },
  bonusAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E31937', // Rojo Coppel
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  progressText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
  },
  uploadButton: {
    backgroundColor: '#005BAF', // Azul Coppel
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#005BAF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    backgroundColor: '#005BAF', // Azul Coppel
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  evenRow: {
    backgroundColor: '#FFFFFF',
  },
  oddRow: {
    backgroundColor: '#F9F9F9',
  },
  cellText: {
    color: '#333333',
    fontSize: 14,
  },
});

export default UserDashboard;