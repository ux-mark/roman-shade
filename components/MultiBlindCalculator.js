// MultiBlindCalculator.js
const MultiBlindCalculator = ({ 
  blinds, 
  setBlinds, 
  units, 
  fabricWidth 
}) => {
  // Get Lucide icons
  const { Ruler, ShoppingCart, Scissors, Package } = lucideReact;
  
  const addBlind = () => {
    if (blinds.length < 4) {
      setBlinds([...blinds, { width: 80, height: 160 }]);
    }
  };

  const removeBlind = () => {
    if (blinds.length > 1) {
      setBlinds(blinds.slice(0, -1));
    }
  };

  const updateBlind = (index, field, value) => {
    const newBlinds = [...blinds];
    newBlinds[index][field] = Number(value);
    setBlinds(newBlinds);
  };

  const multiBlindData = BlindCalculations.calculateMultiBlindRequirements(blinds, fabricWidth, units);

  return React.createElement('div', {
    key: 'multi-blind-calculator',
    className: "space-y-8 mb-8"
  }, [
    // Multiple Blind Dimensions
    React.createElement('div', {
      key: 'multi-dimensions',
      className: "bg-blue-50 p-6 rounded-lg"
    }, [
      React.createElement('div', {
        key: 'multi-header',
        className: "flex items-center justify-between mb-4"
      }, [
        React.createElement('h3', {
          key: 'multi-title',
          className: "text-lg font-semibold flex items-center gap-2"
        }, [
          React.createElement(Ruler, {
            key: 'ruler-icon',
            className: "text-blue-600",
            size: 20
          }),
          `Multiple Blind Dimensions (${blinds.length} blinds)`
        ]),
        React.createElement('div', {
          key: 'multi-controls',
          className: "flex gap-2"
        }, [
          blinds.length < 4 && React.createElement('button', {
            key: 'add-button',
            onClick: addBlind,
            className: "px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          }, "+ Add Blind"),
          blinds.length > 1 && React.createElement('button', {
            key: 'remove-button',
            onClick: removeBlind,
            className: "px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          }, "- Remove")
        ])
      ]),
      React.createElement('div', {
        key: 'blinds-inputs',
        className: "space-y-6"
      }, blinds.map((blind, index) => 
        React.createElement('div', {
          key: `blind-${index}`,
          className: "bg-white p-4 rounded-lg border border-blue-200"
        }, [
          React.createElement('h4', {
            key: `blind-${index}-title`,
            className: "font-medium text-blue-800 mb-3"
          }, `Blind ${index + 1}`),
          React.createElement('div', {
            key: `blind-${index}-inputs`,
            className: "grid md:grid-cols-2 gap-4"
          }, [
            React.createElement('div', {
              key: `blind-${index}-width`
            }, [
              React.createElement('label', {
                key: `blind-${index}-width-label`,
                className: "block text-sm font-medium text-gray-700 mb-2"
              }, `Width ${units === 'metric' ? '(cm)' : '(inches)'}`),
              React.createElement('input', {
                key: `blind-${index}-width-input`,
                type: "number",
                value: units === 'metric' ? blind.width : Math.round(blind.width / 2.54 * 10) / 10,
                onChange: (e) => updateBlind(index, 'width', units === 'metric' ? e.target.value : e.target.value * 2.54),
                min: units === 'metric' ? "30" : "12",
                max: units === 'metric' ? "300" : "120",
                step: units === 'metric' ? "1" : "0.1",
                className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }),
              React.createElement('p', {
                key: `blind-${index}-width-conversion`,
                className: "text-sm text-gray-500 mt-1"
              }, units === 'metric' ? `= ${BlindCalculations.cmToFeetInches(blind.width)}` : `= ${blind.width.toFixed(1)}cm`)
            ]),
            React.createElement('div', {
              key: `blind-${index}-height`
            }, [
              React.createElement('label', {
                key: `blind-${index}-height-label`,
                className: "block text-sm font-medium text-gray-700 mb-2"
              }, `Height ${units === 'metric' ? '(cm)' : '(inches)'}`),
              React.createElement('input', {
                key: `blind-${index}-height-input`,
                type: "number",
                value: units === 'metric' ? blind.height : Math.round(blind.height / 2.54 * 10) / 10,
                onChange: (e) => updateBlind(index, 'height', units === 'metric' ? e.target.value : e.target.value * 2.54),
                min: units === 'metric' ? "50" : "20",
                max: units === 'metric' ? "400" : "160",
                step: units === 'metric' ? "1" : "0.1",
                className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }),
              React.createElement('p', {
                key: `blind-${index}-height-conversion`,
                className: "text-sm text-gray-500 mt-1"
              }, units === 'metric' ? `= ${BlindCalculations.cmToFeetInches(blind.height)}` : `= ${blind.height.toFixed(1)}cm`)
            ])
          ])
        ])
      ))
    ]),

    // Cutting Guide for Multiple Blinds
    React.createElement('div', {
      key: 'cutting-guide',
      className: "bg-green-50 p-6 rounded-lg"
    }, [
      React.createElement('h3', {
        key: 'cutting-title',
        className: "text-lg font-semibold mb-4 flex items-center gap-2"
      }, [
        React.createElement(Scissors, {
          key: 'scissors-icon',
          className: "text-green-600",
          size: 20
        }),
        'Cutting Guide for Each Blind'
      ]),
      React.createElement('div', {
        key: 'cutting-guide-list',
        className: "space-y-4"
      }, multiBlindData.requirements.map((req, index) => 
        React.createElement('div', {
          key: `cutting-${index}`,
          className: "bg-white p-4 rounded-lg border border-green-200"
        }, [
          React.createElement('h4', {
            key: `cutting-${index}-title`,
            className: "font-medium text-green-800 mb-3"
          }, `Blind ${req.blindIndex} (${BlindCalculations.formatSingleUnit(req.originalWidth, units)} × ${BlindCalculations.formatSingleUnit(req.originalHeight, units)} finished)`),
          React.createElement('div', {
            key: `cutting-${index}-details`,
            className: "grid md:grid-cols-2 gap-4"
          }, [
            React.createElement('div', {
              key: `cutting-${index}-face`,
              className: "space-y-1"
            }, [
              React.createElement('p', {
                key: `cutting-${index}-face-title`,
                className: "font-medium"
              }, 'Face Fabric:'),
              React.createElement('p', {
                key: `cutting-${index}-face-dimensions`,
                className: "text-sm"
              }, `Cut ${BlindCalculations.formatSingleUnit(req.faceFabric.width, units)} × ${BlindCalculations.formatSingleUnit(req.faceFabric.height, units)}`)
            ]),
            React.createElement('div', {
              key: `cutting-${index}-lining`,
              className: "space-y-1"
            }, [
              React.createElement('p', {
                key: `cutting-${index}-lining-title`,
                className: "font-medium"
              }, 'Lining:'),
              React.createElement('p', {
                key: `cutting-${index}-lining-dimensions`,
                className: "text-sm"
              }, `Cut ${BlindCalculations.formatSingleUnit(req.lining.width, units)} × ${BlindCalculations.formatSingleUnit(req.lining.height, units)}`)
            ])
          ])
        ])
      ))
    ]),

    // Multi-Blind Shopping Guide
    React.createElement('div', {
      key: 'multi-shopping',
      className: "bg-purple-50 p-6 rounded-lg"
    }, [
      React.createElement('h3', {
        key: 'multi-shopping-title',
        className: "text-lg font-semibold mb-4 flex items-center gap-2"
      }, [
        React.createElement(ShoppingCart, {
          key: 'cart-icon',
          className: "text-purple-600",
          size: 20
        }),
        `Fabric Shopping Guide - ${blinds.length} Blinds`
      ]),
      
      React.createElement('div', {
        key: 'multi-shopping-grid',
        className: "grid md:grid-cols-2 gap-6"
      }, [
        React.createElement('div', {
          key: 'multi-face-purchase',
          className: "bg-white p-4 rounded-lg border border-purple-200"
        }, [
          React.createElement('h4', {
            key: 'multi-face-title',
            className: "font-medium text-purple-800 mb-3"
          }, 'Face Fabric Purchase'),
          
          !multiBlindData.shopping.faceFabric.fitsWidth && React.createElement('div', {
            key: 'multi-face-warning',
            className: "bg-red-100 border border-red-300 p-3 rounded-md mb-3"
          }, [
            React.createElement('p', {
              key: 'multi-face-warning-text',
              className: "text-red-800 text-sm font-medium"
            }, `⚠️ Width needed (${BlindCalculations.formatSingleUnit(multiBlindData.shopping.faceFabric.requiredWidth, units)}) exceeds available (${BlindCalculations.formatSingleUnit(fabricWidth, units)})`)
          ]),
          
          React.createElement('div', {
            key: 'multi-face-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', null, [
              React.createElement('span', { className: "font-medium" }, 'Maximum Width: '),
              BlindCalculations.formatSingleUnit(multiBlindData.shopping.faceFabric.requiredWidth, units)
            ]),
            React.createElement('p', null, [
              React.createElement('span', { className: "font-medium" }, 'Total Length: '),
              BlindCalculations.formatPurchaseLength(multiBlindData.shopping.faceFabric.requiredLength, units)
            ]),
            React.createElement('div', {
              key: 'multi-face-buy-box',
              className: "mt-3 p-2 bg-purple-100 rounded"
            }, [
              React.createElement('p', {
                key: 'multi-face-buy-text',
                className: "font-medium text-purple-800"
              }, [
                React.createElement('strong', null, `Buy: ${BlindCalculations.formatPurchaseLength(multiBlindData.shopping.faceFabric.requiredLength, units)}`)
              ])
            ])
          ])
        ]),

        React.createElement('div', {
          key: 'multi-lining-purchase',
          className: "bg-white p-4 rounded-lg border border-purple-200"
        }, [
          React.createElement('h4', {
            key: 'multi-lining-title',
            className: "font-medium text-purple-800 mb-3"
          }, 'Lining Fabric Purchase'),
          
          !multiBlindData.shopping.lining.fitsWidth && React.createElement('div', {
            key: 'multi-lining-warning',
            className: "bg-red-100 border border-red-300 p-3 rounded-md mb-3"
          }, [
            React.createElement('p', {
              key: 'multi-lining-warning-text',
              className: "text-red-800 text-sm font-medium"
            }, `⚠️ Width needed (${BlindCalculations.formatSingleUnit(multiBlindData.shopping.lining.requiredWidth, units)}) exceeds available (${BlindCalculations.formatSingleUnit(fabricWidth, units)})`)
          ]),
          
          React.createElement('div', {
            key: 'multi-lining-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', null, [
              React.createElement('span', { className: "font-medium" }, 'Maximum Width: '),
              BlindCalculations.formatSingleUnit(multiBlindData.shopping.lining.requiredWidth, units)
            ]),
            React.createElement('p', null, [
              React.createElement('span', { className: "font-medium" }, 'Total Length: '),
              BlindCalculations.formatPurchaseLength(multiBlindData.shopping.lining.requiredLength, units)
            ]),
            React.createElement('div', {
              key: 'multi-lining-buy-box',
              className: "mt-3 p-2 bg-purple-100 rounded"
            }, [
              React.createElement('p', {
                key: 'multi-lining-buy-text',
                className: "font-medium text-purple-800"
              }, [
                React.createElement('strong', null, `Buy: ${BlindCalculations.formatPurchaseLength(multiBlindData.shopping.lining.requiredLength, units)}`)
              ])
            ])
          ])
        ])
      ]),

      React.createElement('div', {
        key: 'shopping-list-summary',
        className: "mt-6 bg-white p-4 rounded-lg border-2 border-purple-300"
      }, [
        React.createElement('h4', {
          key: 'shopping-list-title',
          className: "font-bold text-purple-900 mb-2"
        }, `🛒 Shopping List (${blinds.length} Blinds)`),
        React.createElement('div', {
          key: 'shopping-list-items',
          className: "text-sm space-y-1"
        }, [
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Face Fabric: '),
            BlindCalculations.formatPurchaseLength(multiBlindData.shopping.faceFabric.requiredLength, units),
            `, at least ${BlindCalculations.formatSingleUnit(multiBlindData.shopping.faceFabric.requiredWidth, units)} wide`
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Lining Fabric: '),
            BlindCalculations.formatPurchaseLength(multiBlindData.shopping.lining.requiredLength, units),
            `, at least ${BlindCalculations.formatSingleUnit(multiBlindData.shopping.lining.requiredWidth, units)} wide`
          ])
        ])
      ])
    ]),

    // Ring Placement for Multiple Blinds
    React.createElement('div', {
      key: 'ring-placement',
      className: "bg-gray-50 p-6 rounded-lg"
    }, [
      React.createElement('h3', {
        key: 'ring-placement-title',
        className: "text-lg font-semibold mb-4"
      }, '📍 Ring Placement Layout - All Blinds'),
      
      React.createElement('div', {
        key: 'ring-placement-blinds',
        className: "space-y-8"
      }, blinds.map((blind, index) => {
        const blindRingData = BlindCalculations.getBlindRingData(blind.width, blind.height);
        
        return React.createElement('div', {
          key: `blind-rings-${index}`,
          className: "bg-white p-4 rounded-lg border border-gray-200"
        }, [
          React.createElement('h4', {
            key: `blind-rings-title-${index}`,
            className: "font-medium text-gray-800 mb-3"
          }, `Blind ${index + 1} - Ring Layout`),
          React.createElement('div', {
            key: `blind-rings-details-${index}`,
            className: "mb-3 text-sm"
          }, [
            React.createElement('p', null, `${blindRingData.totalRings} rings total (${blindRingData.ringRows} columns × ${blindRingData.verticalRings} rows)`),
            React.createElement('p', {
              className: "mt-2 font-medium"
            }, 'Horizontal positions from left edge:'),
            React.createElement('div', {
              className: "flex flex-wrap gap-2 mt-1"
            }, blindRingData.ringPositions.map((pos, posIdx) => 
              React.createElement('span', {
                key: `blind-${index}-pos-${posIdx}`,
                className: "px-2 py-1 bg-blue-100 rounded"
              }, BlindCalculations.formatSingleUnit(pos, units))
            ))
          ]),
          React.createElement('div', {
            key: `blind-rings-visual-${index}`,
            className: "border border-gray-200 bg-gray-50",
            style: {
              height: '100px',
              position: 'relative'
            }
          }, [
            // Visual representation of rings
            ...blindRingData.ringPositions.map((xPos, colIdx) => {
              const verticalPositions = [];
              const verticalSpacing = blind.height / (blindRingData.verticalRings + 1);
              
              for (let rowIdx = 1; rowIdx <= blindRingData.verticalRings; rowIdx++) {
                verticalPositions.push(rowIdx * verticalSpacing);
              }

              return verticalPositions.map((yPos, rowIdx) => 
                React.createElement('div', {
                  key: `blind-${index}-ring-${colIdx}-${rowIdx}`,
                  className: "absolute w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2",
                  style: {
                    left: `${(xPos / blind.width) * 100}%`,
                    top: `${(yPos / blind.height) * 100}%`
                  }
                })
              );
            }).flat()
          ])
        ])
      })),

      // Combined Hardware Summary
      React.createElement('div', {
        key: 'combined-hardware',
        className: "mt-6 bg-blue-50 p-4 rounded-lg"
      }, [
        React.createElement('h4', {
          key: 'combined-hardware-title',
          className: "font-medium text-blue-800 mb-3"
        }, `🔧 Combined Hardware Summary (${blinds.length} Blinds)`),
        React.createElement('div', {
          key: 'combined-hardware-grid',
          className: "grid md:grid-cols-2 gap-4 text-sm"
        }, [
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Total Rings: '),
            blinds.reduce((sum, blind) => {
              const data = BlindCalculations.getBlindRingData(blind.width, blind.height);
              return sum + data.totalRings;
            }, 0)
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Mounting Boards: '),
            blinds.reduce((sum, blind) => sum + 1, 0),
            ' pieces'
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Weight Rods: '),
            blinds.reduce((sum, blind) => sum + 1, 0),
            ' pieces'
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Cord Cleats: '),
            blinds.reduce((sum, blind) => sum + 1, 0),
            ' sets'
          ])
        ])
      ])
    ])
  ]);
};
