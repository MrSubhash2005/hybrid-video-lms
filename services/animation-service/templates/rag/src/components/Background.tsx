import { Rect, RectProps, Grid } from '@revideo/2d';
import { THEME } from '../utils/theme';

export interface BackgroundProps extends RectProps {
  showGrid?: boolean;
}

/**
 * Modern dark space background with an optional grid overlay.
 */
export function Background({ showGrid = true, children, ...props }: BackgroundProps) {
  return (
    <Rect
      size={['100%', '100%']}
      fill={THEME.colors.bgDark}
      {...props}
    >
      {/* Futuristic grid pattern */}
      {showGrid && (
        <Grid
          width={'100%'}
          height={'100%'}
          spacing={80}
          stroke={'rgba(59, 130, 246, 0.05)'}
          lineWidth={1}
        />
      )}
      {children}
    </Rect>
  );
}
