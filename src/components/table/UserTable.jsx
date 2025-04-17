import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  Alert,
  TablePagination,
  InputAdornment
} from '@mui/material';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import './usertable.scss'

// Initial data to populate storage if empty
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901', role: 'User' },
  { id: 3, name: 'Michael Johnson', email: 'michael@example.com', phone: '345-678-9012', role: 'Manager' },
];

export default function UserManagementTable() {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', phone: '', role: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(initialUsers);
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, []);

  // Update localStorage whenever users change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(lowercasedSearch) ||
        user.email.toLowerCase().includes(lowercasedSearch) ||
        user.phone.includes(searchTerm) ||
        user.role.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredUsers(filtered);
    }
    setPage(0); // Reset to first page when search changes
  }, [searchTerm, users]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentUser.name.trim()) newErrors.name = 'Name is required';
    
    if (!currentUser.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(currentUser.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!currentUser.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(currentUser.phone)) {
      newErrors.phone = 'Phone format should be XXX-XXX-XXXX';
    }
    
    if (!currentUser.role.trim()) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenDialog = (user = { id: null, name: '', email: '', phone: '', role: '' }, edit = false) => {
    setCurrentUser(user);
    setIsEditing(edit);
    setDialogOpen(true);
    setErrors({});
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
    // Clear error on typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isEditing) {
      // Update existing user
      const updatedUsers = users.map(user => user.id === currentUser.id ? currentUser : user);
      setUsers(updatedUsers);
      setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
    } else {
      // Add new user
      const newUser = { ...currentUser, id: Date.now() };
      setUsers(prevUsers => [...prevUsers, newUser]);
      setSnackbar({ open: true, message: 'User added successfully', severity: 'success' });
    }
    
    handleCloseDialog();
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setSnackbar({ open: true, message: 'User deleted successfully', severity: 'warning' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Get current page of users for pagination
  const currentUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box className="mainContainer">
      <Box className="headerContainer">
        <Typography variant="h5" component="h1" gutterBottom style={{ fontFamily: 'Nunito, sans-serif', color: 'gray' }}>
          User Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PlusCircle size={16} />}
          onClick={() => handleOpenDialog()}
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          Add New User
        </Button>
      </Box>

      {/* Search Box */}
      <Box sx={{ mb: 2 }}>
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search users by name, email, phone or role..."
    value={searchTerm}
    onChange={handleSearchChange}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search size={20} />
        </InputAdornment>
      )
    }}
    className="search-field"
  />
</Box>

      <TableContainer component={Paper}>
        <Table className='' sx={{ minWidth: 600, fontFamily: 'Nunito, sans-serif' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{fontFamily:'Nunito,sans-serif'}}>Name</TableCell>
              <TableCell style={{fontFamily:'Nunito,sans-serif'}}>Email</TableCell>
              <TableCell style={{fontFamily:'Nunito,sans-serif'}}>Phone</TableCell>
              <TableCell style={{fontFamily:'Nunito,sans-serif'}}>Role</TableCell>
              <TableCell align="right" style={{fontFamily:'Nunito,sans-serif'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{fontFamily:'Nunito,sans-serif'}}>{user.name}</TableCell>
                  <TableCell style={{fontFamily:'Nunito,sans-serif'}}>{user.email}</TableCell>
                  <TableCell style={{fontFamily:'Nunito,sans-serif'}}>{user.phone}</TableCell>
                  <TableCell style={{fontFamily:'Nunito,sans-serif'}}>{user.role}</TableCell>
                  <TableCell style={{fontFamily:'Nunito,sans-serif'}} align="right">
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpenDialog(user, true)}
                      sx={{ mr: 1 }}
                    >
                      <Edit size={16} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteUser(user.id)}
                      color="error"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {searchTerm ? 'No matching users found' : 'No users found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={filteredUsers.length <= page * rowsPerPage && page > 0 ? 0 : page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add/Edit User Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle style={{fontFamily:'Nunito,sans-serif'}}>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              fullWidth
              variant="outlined"
              value={currentUser.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              style={{fontFamily:'Nunito,sans-serif'}}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={currentUser.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              style={{fontFamily:'Nunito,sans-serif'}}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone (Format: XXX-XXX-XXXX)"
              fullWidth
              variant="outlined"
              value={currentUser.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              margin="dense"
              name="role"
              label="Role"
              fullWidth
              variant="outlined"
              value={currentUser.role}
              onChange={handleInputChange}
              error={!!errors.role}
              helperText={errors.role}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size='large' onClick={handleCloseDialog} style={{fontFamily:'Nunito,sans-serif'}}>Cancel</Button>
          <Button size='medium' style={{fontFamily:'Nunito,sans-serif'}} onClick={handleSubmit} variant="contained">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Notification */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}