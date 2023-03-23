import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Search2Icon, CloseIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'redux/filter/selectors';
import { applyFilter } from 'redux/filter/slice';

export const ContactFilter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleFilter = e => dispatch(applyFilter(e.target.value));
  const resetFilter = () => dispatch(applyFilter(''));

  return (
    <InputGroup p={4} mb="20px">
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon boxSize={6} />}
      />
      <Input
        type="text"
        name="filter"
        placeholder="Type something here"
        // size="lg"
        value={filter}
        variant="flushed"
        autoComplete="off"
        onChange={handleFilter}
        fontSize="2xl"
      />
      <InputRightElement
        children={
          <IconButton
            aria-label="reset filter"
            icon={<CloseIcon />}
            onClick={resetFilter}
            bg="inherit"
          />
        }
      />
    </InputGroup>
  );
};
