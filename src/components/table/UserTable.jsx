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
  Alert
} from '@mui/material';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
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

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

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

  return (
    <Box  className="mainContainer">
      <Box className="headerContainer">
        <Typography variant="h5" component="h1" gutterBottom style={{ fontFamily: 'Nunito, sans-serif' }}>
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

      <TableContainer component={Paper} >
        <Table className='' sx={{ minWidth: 600,fontFamily:'Nunito,sans-serif' }} >
          <TableHead>
            <TableRow >
              <TableCell className='table-cell'
              >Name</TableCell>
              <TableCell className='table-cell'
              >Email</TableCell>
              <TableCell className='table-cell'
              >Phone</TableCell>
              <TableCell className='table-cell'
              >Role</TableCell>
              <TableCell align="right" className='table-cell'
              >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='table-cell'>{user.name}</TableCell>
                  <TableCell className='table-cell'>{user.email}</TableCell>
                  <TableCell className='table-cell'>{user.phone}</TableCell>
                  <TableCell className='table-cell'>{user.role}</TableCell>
                  <TableCell className='table-cell' align="right">
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
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit User Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle className='table-cell'>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }} >
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
              className='table-cell'
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
              className='table-cell'
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
          <Button size='large' onClick={handleCloseDialog} className='table-cell'>Cancel</Button>
          <Button size='medium' className='table-cell' onClick={handleSubmit} variant="contained">
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