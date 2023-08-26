import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
export interface LoadMoreButtonProps {
  totalItems: number;
  nextCursor?: string; //last item id in current list
  onLoadMore?: (cursor: string | undefined) => void;
  isLoading?: boolean; //
}

const LoadMoreButton = (props: LoadMoreButtonProps) => {
  const { totalItems, nextCursor, onLoadMore, isLoading = false } = props;
  const theme = useTheme();
  // console.log('listTable - rerender', nextCursor);

  return (
    <Grid
      container
      sx={{
        marginBottom: '3px',
        background: theme.palette.grey[50],
        borderRadius: '0.25rem',
        p: 1,
        position: 'relative',
        minHeight: '48px',
        boder: `1px solid ${theme.palette.divider}`
      }}
    >
      <Typography sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'medium' }}>
        Total: {totalItems}
      </Typography>
      {nextCursor && (
        <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12}>
          <LoadingButton
            sx={{ padding: '3px 8px' }}
            size="small"
            variant="outlined"
            className="w-100 bd-0"
            onClick={() => {
              onLoadMore && onLoadMore(nextCursor);
            }}
            loading={isLoading}
          >
            Load More
          </LoadingButton>
        </Grid>
      )}
    </Grid>
  );
};

export default LoadMoreButton;
