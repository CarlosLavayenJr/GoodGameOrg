import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import { ADD_CATEGORY, DELETE_CATEGORY } from '../utils/mutations';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryDropdown = ({ selectedCategory, onCategoryChange }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [error, setError] = useState('');

  const { data, loading, refetch } = useQuery(GET_CATEGORIES);

  const [addCategory] = useMutation(ADD_CATEGORY, {
    onCompleted: () => {
      setNewCategoryName('');
      setNewCategoryDesc('');
      setError('');
      refetch();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: (data) => {
      if (selectedCategory === data.deleteCategory._id) {
        onCategoryChange('');
      }
      refetch();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleAdd = () => {
    if (!newCategoryName.trim()) return;
    addCategory({ variables: { name: newCategoryName.trim(), description: newCategoryDesc.trim() || undefined } });
  };

  const handleDelete = (id) => {
    deleteCategory({ variables: { _id: id } });
  };

  const categories = data?.categories || [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: 'white' }}>Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Category"
          onChange={(e) => onCategoryChange(e.target.value)}
          sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' } }}
        >
          <MenuItem value="">
            <em>Select a category</em>
          </MenuItem>
          {loading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : (
            categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{cat.name}</span>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(cat._id);
                  }}
                  aria-label={`Delete ${cat.name}`}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <TextField
          label="New Category Name"
          variant="outlined"
          size="small"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Description (optional)"
          variant="outlined"
          size="small"
          value={newCategoryDesc}
          onChange={(e) => setNewCategoryDesc(e.target.value)}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <Button variant="contained" onClick={handleAdd} disabled={!newCategoryName.trim()}>
          Add
        </Button>
      </Box>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
};

CategoryDropdown.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryDropdown;
