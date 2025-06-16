// BlindCalculations.js - Utility class for roman blind calculations

const BlindCalculations = {
  // Basic calculations for blind dimensions
  getBlindCalculations: function(width, height) {
    return {
      // Face fabric dimensions (with allowances)
      faceFabricWidth: width + 14, // 7cm on each side
      faceFabricHeight: height + 35.5, // 30.5cm for bottom hem + 2.5cm for top edge + 2.5cm safety
      
      // Lining dimensions (slightly smaller than face fabric)
      liningWidth: width + 2, // 1cm on each side
      liningHeight: height + 5,
      
      // Support pieces
      mountingBoardLength: width + 5, // slight extension beyond the blind
      weightRodLength: width - 2, // slightly shorter than blind width
      
      // Ring calculations
      ringRows: Math.max(3, Math.ceil(width / 40)), // One column every ~40cm, minimum 3
      verticalRings: Math.max(3, Math.ceil(height / 20)), // One row every 20cm, minimum 3
    };
  },
  
  // Calculate fabric requirements for multiple blinds
  calculateMultiBlindRequirements: function(blinds, fabricWidth, units) {
    // Calculate individual blind requirements
    const blindRequirements = blinds.map(blind => {
      const calc = this.getBlindCalculations(blind.width, blind.height);
      return {
        width: blind.width,
        height: blind.height,
        faceFabricWidth: calc.faceFabricWidth,
        faceFabricHeight: calc.faceFabricHeight,
        liningWidth: calc.liningWidth,
        liningHeight: calc.liningHeight
      };
    });
    
    // Consolidate fabric purchases
    const totalFaceHeight = blindRequirements.reduce((sum, blind) => sum + blind.faceFabricHeight, 0);
    const totalLiningHeight = blindRequirements.reduce((sum, blind) => sum + blind.liningHeight, 0);
    
    // Check if any blind is too wide for the fabric
    const widestFaceFabric = Math.max(...blindRequirements.map(b => b.faceFabricWidth));
    const widestLining = Math.max(...blindRequirements.map(b => b.liningWidth));
    const isTooWide = widestFaceFabric > fabricWidth;
    
    // Purchase amounts in increments
    const faceIncrement = units === 'metric' ? 10 : 3.94; // 10cm or 4" increments
    const facePurchaseHeight = Math.ceil(totalFaceHeight / faceIncrement) * faceIncrement;
    const liningPurchaseHeight = Math.ceil(totalLiningHeight / faceIncrement) * faceIncrement;
    
    return {
      blindRequirements,
      totalFaceHeight,
      totalLiningHeight,
      widestFaceFabric,
      widestLining,
      isTooWide,
      facePurchaseHeight,
      liningPurchaseHeight
    };
  },
  
  // Calculate horizontal positions for rings across the blind width
  getRingPositionsForBlind: function(width) {
    const numColumns = Math.max(3, Math.ceil(width / 40));
    const positions = [];
    
    // First and last are 2.5cm from edge
    positions.push(2.5);
    
    if (numColumns > 2) {
      // Evenly distribute middle columns
      const spacing = (width - 5) / (numColumns - 1);
      for (let i = 1; i < numColumns - 1; i++) {
        positions.push(2.5 + spacing * i);
      }
    }
    
    positions.push(width - 2.5);
    return positions;
  },
  
  // Calculate cord lengths for each column
  getCordLengthsForBlind: function(width, height) {
    const ringPositions = this.getRingPositionsForBlind(width);
    const cords = [];
    
    // For right-hand draw, cords get longer as we move left
    // Leftmost cord = height * 2 (up and down) + width (across top) + 100cm (handling allowance)
    // Each cord to the right is shorter by the distance it doesn't need to travel across the top
    
    for (let i = 0; i < ringPositions.length; i++) {
      const horizontalDistance = width - ringPositions[i];
      const cordLength = height * 2 + horizontalDistance + 100;
      cords.push(Math.ceil(cordLength / 5) * 5); // Round up to nearest 5cm
    }
    
    return cords;
  },
  
  // Formatting utilities
  formatMeasurement: function(value, units) {
    if (units === 'metric') {
      return value < 100 ? `${value.toFixed(1)}cm` : `${(value/100).toFixed(2)}m`;
    } else {
      // Convert to inches
      const inches = value / 2.54;
      return `${inches.toFixed(1)}"`;
    }
  },
  
  formatSingleUnit: function(value, units) {
    if (units === 'metric') {
      return `${value.toFixed(1)}cm`;
    } else {
      // Convert to inches
      const inches = value / 2.54;
      return `${inches.toFixed(1)}"`;
    }
  },
  
  cmToFeetInches: function(cm) {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round((inches % 12) * 10) / 10;
    return `${feet}'${remainingInches}"`;
  },
  
  getPurchaseIncrement: function(units) {
    return units === 'metric' ? 10 : 3.94; // 10cm or 4" increments
  },
  
  formatPurchaseLength: function(value, units) {
    if (units === 'metric') {
      return value < 100 ? `${value}cm` : `${(value/100).toFixed(2)}m`;
    } else {
      // Convert to inches and show feet if over 36"
      const inches = value / 2.54;
      if (inches > 36) {
        const feet = Math.floor(inches / 12);
        const remainingInches = Math.round(inches % 12);
        return `${feet}'${remainingInches}"`;
      } else {
        return `${Math.round(inches)}″`;
      }
    }
  }
};
