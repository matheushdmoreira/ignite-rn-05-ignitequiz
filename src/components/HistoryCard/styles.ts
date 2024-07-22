import { StyleSheet } from 'react-native'
import { THEME } from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 91,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.GREY_700,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: -1
  },
  title: {
    color: THEME.COLORS.GREY_100,
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: 16,
  },
  subtitle: {
    color: THEME.COLORS.GREY_300,
    fontSize: 12,
  },
})
