export const checkFXConversion = (originalTotal, convertedTotal, fxRate) => {
  // originalTotal: 100
  // convertedTotal: 120
  // fxRate: 1.2

  // estimatedConvertedTotal: 100 * 1.2 = 120
  const estimatedConvertedTotal = originalTotal * fxRate

  // estimatedConversionUpperBound: 120 * 1.02 = 122.4
  const estimatedConversionUpperBound = estimatedConvertedTotal * 1.02
  // estimatedConversionLowerBound: 120 * 0.98 = 117.6
  const estimatedConversionLowerBound = estimatedConvertedTotal * 0.98

  if (
    convertedTotal <= estimatedConversionUpperBound &&
    convertedTotal >= estimatedConversionLowerBound
  ) {
    const response = {
      result: 'conversion appears accurate, estimate is within 2% of actual',
      estimatedConvertedTotal: estimatedConvertedTotal,
      actualConvertedTotal: convertedTotal,
    }
    return response
  } else {
    const response = {
      result:
        'conversion appears inaccurate, estimate is more than 2% different to actual',
      estimatedConvertedTotal: estimatedConvertedTotal,
      actualConvertedTotal: convertedTotal,
    }
    return response
  }
}
