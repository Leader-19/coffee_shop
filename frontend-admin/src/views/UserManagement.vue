<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
            <p class="text-sm text-gray-600 mt-1">Manage and monitor user accounts</p>
          </div>
          <button
            @click="openAddModal"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlusIcon class="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <UsersIcon class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-2xl font-bold text-gray-900">{{ users.length }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircleIcon class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Users</p>
            <p class="text-2xl font-bold text-gray-900">{{ activeUsers }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <ClockIcon class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-bold text-gray-900">{{ pendingUsers }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <XCircleIcon class="h-6 w-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Inactive</p>
            <p class="text-2xl font-bold text-gray-900">{{ inactiveUsers }}</p>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow mb-6 p-6 flex flex-col sm:flex-row gap-4">
        <div class="relative flex-1">
          <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          v-model="statusFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        <select
          v-model="roleFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap flex items-center">
                <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span class="text-sm font-medium text-gray-700">{{ user.name.charAt(0).toUpperCase() }}</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getRoleClass(user.role)">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(user.status)">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.lastActive) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button @click="viewUser(user)" class="text-blue-600 hover:text-blue-900 p-1 rounded">
                  <EyeIcon class="h-4 w-4" />
                </button>
                <button @click="openEditModal(user)" class="text-green-600 hover:text-green-900 p-1 rounded">
                  <PencilIcon class="h-4 w-4" />
                </button>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900 p-1 rounded">
                  <TrashIcon class="h-4 w-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination (Static example, you can improve later) -->
      <div class="bg-white px-4 py-3 flex justify-end border-t border-gray-200 sm:px-6 mt-6 rounded-lg shadow">
        <p class="text-sm text-gray-700">Showing 1 to {{ filteredUsers.length }} of {{ filteredUsers.length }} results</p>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-md shadow p-6 w-full max-w-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ showAddModal ? 'Add New User' : 'Edit User' }}</h3>
        <form @submit.prevent="showAddModal ? addUser() : updateUser()">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Name</label>
            <input
              v-model="userForm.name"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
              v-model="userForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Role</label>
            <select v-model="userForm.role" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium mb-1">Status</label>
            <select v-model="userForm.status" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">
              {{ showAddModal ? 'Add User' : 'Update User' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  SearchIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from 'lucide-vue-next'
import axios from 'axios'

// Users array
const users = ref([])

// Filters and modals
const searchQuery = ref('')
const statusFilter = ref('')
const roleFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingUser = ref(null)
const userForm = ref({
  name: '',
  email: '',
  role: 'user',
  status: 'active'
})

// Loading and error
const isLoading = ref(false)
const error = ref(null)

onMounted(() => {
  fetchUsers()
})

const fetchUsers = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/users')
    users.value = response.data.data
    console.log(users)
  } catch (err) {
    console.error(err)
    error.value = 'Failed to fetch users'
  } finally {
    isLoading.value = false
  }
}

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    return matchesSearch && matchesStatus && matchesRole
  })
})

const activeUsers = computed(() => users.value.filter(u => u.status === 'active').length)
const inactiveUsers = computed(() => users.value.filter(u => u.status === 'inactive').length)
const pendingUsers = computed(() => users.value.filter(u => u.status === 'pending').length)

const getRoleClass = role => {
  return {
    admin: 'bg-purple-100 text-purple-800',
    user: 'bg-blue-100 text-blue-800',
    moderator: 'bg-green-100 text-green-800'
  }[role] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = status => {
  return {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  }[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = date => {
  if (!date) return '-'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  }).format(new Date(date))
}

const openAddModal = () => {
  showAddModal.value = true
  showEditModal.value = false
  userForm.value = { name: '', email: '', role: 'user', status: 'active' }
}

const openEditModal = user => {
  editingUser.value = user
  userForm.value = { ...user }
  showEditModal.value = true
  showAddModal.value = false
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingUser.value = null
  userForm.value = { name: '', email: '', role: 'user', status: 'active' }
}

const addUser = () => {
  users.value.push({
    id: Date.now(), // temporary unique id
    ...userForm.value,
    lastActive: new Date()
  })
  closeModal()
}

const updateUser = () => {
  if (editingUser.value) {
    Object.assign(editingUser.value, userForm.value)
  }
  closeModal()
}

const deleteUser = id => {
  if (confirm('Are you sure you want to delete this user?')) {
    users.value = users.value.filter(u => u.id !== id)
  }
}

const viewUser = user => {
  alert(`Name: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nStatus: ${user.status}`)
}
</script>
