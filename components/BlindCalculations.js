// BlindCalculations.js - Utility class for roman blind calculations

const BlindCalculations = {
  // Basic calculations for blind dimensions
  getBlindCalculations: function(width, height, isInnerMeasurement = false) {
    // Apply adjustment if inner measurement is selected (add to width)
    const adjustedWidth = isInnerMeasurement ? width + 1 : width;
    
    // Reduce all lengths by 0.5 cm / 1/4" for manufacturing precision
    const lengthReduction = 0.5;
    const reducedWidth = adjustedWidth - lengthReduction;
    const reducedHeight = height - lengthReduction;
    
    return {
      // Face fabric dimensions (with allowances)
      faceFabricWidth: reducedWidth + 14, // 7cm on each side
      faceFabricHeight: reducedHeight + 35.5, // 30.5cm for bottom hem + 2.5cm for top edge + 2.5cm safety
      
      // Lining dimensions (slightly smaller than face fabric)
      liningWidth: reducedWidth + 2.5, // 2.5cm or 1" wider than finished width
      liningHeight: reducedHeight + 5,
      
      // Support pieces
      mountingBoardLength: reducedWidth - 0.5, // slight extension beyond the blind
      weightRodLength: reducedWidth - 1, // slightly shorter than blind width
      
      // Ring calculations
      ringRows: Math.max(3, Math.ceil(reducedWidth / 16)),
      verticalRings: Math.ceil(reducedHeight / 20),
      
      // Store original dimensions for reference
      originalWidth: width,
      originalHeight: height,
      isInnerMeasurement: isInnerMeasurement,
    };
  },
  
  // Calculate ring positions for a blind
  getRingPositionsForBlind: function(blindWidth, isInnerMeasurement = false) {
    // Apply adjustment if inner measurement is selected
    const adjustedWidth = isInnerMeasurement ? blindWidth + 1 : blindWidth;
    
    // Reduce length by 0.5 cm / 1/4" for manufacturing precision
    const reducedWidth = adjustedWidth - 0.5;
    
    const ringRows = Math.max(3, Math.ceil(reducedWidth / 16));
    const positions = [];
    const spacing = (reducedWidth - 5) / Math.max(2, ringRows - 1); // 2.5cm from each edge
    
    for (let i = 0; i < ringRows; i++) {
      positions.push(2.5 + (i * spacing));
    }
    return positions;
  },
  
  // Calculate cord lengths for a blind
  getCordLengthsForBlind: function(blindWidth, blindHeight, isInnerMeasurement = false) {
    // Apply adjustment if inner measurement is selected
    const adjustedWidth = isInnerMeasurement ? blindWidth + 1 : blindWidth;
    
    // Reduce lengths by 0.5 cm / 1/4" for manufacturing precision
    const reducedWidth = adjustedWidth - 0.5;
    const reducedHeight = blindHeight - 0.5;
    
    const baseLength = reducedHeight * 2.5;
    const ringPositions = this.getRingPositionsForBlind(reducedWidth, isInnerMeasurement);
    
    return ringPositions.map((pos, index) => {
      const additionalLength = (ringPositions.length - 1 - index) * 30;
      return Math.round((baseLength + additionalLength) / 10) * 10;
    });
  },
  
  // Calculate fabric requirements for multiple blinds
  calculateMultiBlindRequirements: function(blinds, fabricWidth, units) {
    // Calculate individual blind requirements
    const requirements = blinds.map((blind, index) => {
      // Apply adjustment if inner measurement is selected
      const adjustedWidth = blind.isInnerMeasurement ? blind.width + 1 : blind.width;
      
      // Reduce all lengths by 0.5 cm / 1/4" for manufacturing precision
      const lengthReduction = 0.5;
      const reducedWidth = adjustedWidth - lengthReduction;
      const reducedHeight = blind.height - lengthReduction;
      
      const faceFabricWidth = reducedWidth + 14;
      const faceFabricHeight = reducedHeight + 35.5;
      const liningWidth = reducedWidth + 2.5;
      const liningHeight = reducedHeight + 5;

      return {
        blindIndex: index + 1,
        originalWidth: blind.width,
        originalHeight: blind.height,
        isInnerMeasurement: blind.isInnerMeasurement || false,
        faceFabric: { width: faceFabricWidth, height: faceFabricHeight },
        lining: { width: liningWidth, height: liningHeight }
      };
    });
    
    // Find maximums and totals
    const maxFaceFabricWidth = Math.max(...requirements.map(r => r.faceFabric.width));
    const maxLiningWidth = Math.max(...requirements.map(r => r.lining.width));
    const totalFaceFabricHeight = requirements.reduce((sum, r) => sum + r.faceFabric.height, 0);
    const totalLiningHeight = requirements.reduce((sum, r) => sum + r.lining.height, 0);
    
    // Check if any blind is too wide for the fabric
    const isTooWideForFace = maxFaceFabricWidth > fabricWidth;
    const isTooWideForLining = maxLiningWidth > fabricWidth;
    
    // Purchase amounts in increments
    const purchaseIncrement = this.getPurchaseIncrement(units);
    const faceFabricLength = Math.ceil(totalFaceFabricHeight / purchaseIncrement) * purchaseIncrement;
    const liningLength = Math.ceil(totalLiningHeight / purchaseIncrement) * purchaseIncrement;
    
    return {
      requirements,
      shopping: {
        faceFabric: {
          fitsWidth: !isTooWideForFace,
          requiredWidth: maxFaceFabricWidth,
          requiredLength: faceFabricLength,
        },
        lining: {
          fitsWidth: !isTooWideForLining,
          requiredWidth: maxLiningWidth,
          requiredLength: liningLength,
        }
      }
    };
  },
  
  // Calculate ring data for a specific blind
  getBlindRingData: function(blindWidth, blindHeight) {
    const ringRows = Math.max(3, Math.ceil(blindWidth / 16));
    const verticalRings = Math.ceil(blindHeight / 20);
    const totalRings = ringRows * verticalRings;
    const ringPositions = this.getRingPositionsForBlind(blindWidth);
    const cordLengths = this.getCordLengthsForBlind(blindWidth, blindHeight);
    
    return {
      ringRows,
      verticalRings,
      totalRings,
      ringPositions,
      cordLengths
    };
  },
  
  // Formatting utilities
  cmToFeetInches: function(cm) {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = (totalInches % 12).toFixed(1);
    if (feet === 0) {
      return `${inches}"`;
    }
    return `${feet}'${inches}"`;
  },
  
  formatMeasurement: function(cm, units) {
    if (units === 'metric') {
      return `${cm.toFixed(1)}cm`;
    } else {
      return this.cmToFeetInches(cm);
    }
  },
  
  formatSingleUnit: function(cm, units) {
    if (units === 'metric') {
      return `${cm.toFixed(1)}cm`;
    } else {
      return this.cmToFeetInches(cm);
    }
  },
  
  getPurchaseIncrement: function(units) {
    return units === 'metric' ? 100 : 91.44; // 100cm (1m) or 1 yard (36")
  },
  
  formatPurchaseLength: function(cm, units) {
    if (units === 'metric') {
      const meters = (cm / 100).toFixed(1);
      return `${meters}m`;
    } else {
      const yards = (cm / 91.44).toFixed(1);
      return `${yards}yd`;
    }
  }
};
