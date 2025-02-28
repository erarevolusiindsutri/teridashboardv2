import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import { Vector3 } from 'three';
import { DollarSign, Package, HeadphonesIcon } from 'lucide-react';
import { UnitProps } from '../types';
import { useDashboardStore } from '../store';
import { StockUnit } from './models/StockUnit';
import { SalesUnit } from './models/SalesUnit';
import { ServiceUnit } from './models/ServiceUnit';

const DataLine = ({ start, end, active }: { start: number[], end: number[], active: boolean }) => {
  const lineRef = useRef();
  
  useFrame((state) => {
    if (active) {
      lineRef.current.material.dashOffset -= 0.01;
    }
  });

  const points = [
    new Vector3(...start),
    new Vector3(start[0], 0, start[2]),
    new Vector3(start[0], 0, end[2]),
    new Vector3(end[0], 0, end[2]),
    new Vector3(...end)
  ];

  return (
    <Line
      ref={lineRef}
      points={points}
      color={active ? "#4affff" : "#333333"}
      lineWidth={2}
      dashed={true}
      dashScale={20}
      dashSize={0.2}
      dashOffset={0}
    />
  );
};

const Unit = ({ position, color, type, data, onClick }: UnitProps) => {
  const selectedUnit = useDashboardStore((state) => state.selectedUnit);
  const isSelected = selectedUnit === type;

  const getIcon = () => {
    switch(type) {
      case 'sales': return <DollarSign className="w-6 h-6 text-white" />;
      case 'stock': return <Package className="w-6 h-6 text-white" />;
      case 'service': return <HeadphonesIcon className="w-6 h-6 text-white" />;
    }
  };

  const getUnitModel = () => {
    switch(type) {
      case 'stock': return <StockUnit color={color} isSelected={isSelected} />;
      case 'sales': return <SalesUnit color={color} isSelected={isSelected} />;
      case 'service': return <ServiceUnit color={color} isSelected={isSelected} />;
    }
  };

  return (
    <group position={position} onClick={onClick}>
      {getUnitModel()}
      <Html position={[0, 4, 0]} center>
        <div className="bg-black/70 backdrop-blur-sm p-2 rounded-lg">
          {getIcon()}
          <div className="text-white text-xs mt-1">
            {data.value.toFixed(0)}%
          </div>
        </div>
      </Html>
    </group>
  );
};

export function Units() {
  const { unitData, selectedUnit, setSelectedUnit } = useDashboardStore();

  const positions = {
    sales: [0, 0, -4],
    stock: [-6, 0, 4],
    service: [6, 0, 4]
  };

  const handleUnitClick = (type: UnitProps['type']) => {
    setSelectedUnit(selectedUnit === type ? null : type);
  };

  return (
    <group>
      {Object.entries(positions).map(([type, position]) => (
        <Unit
          key={type}
          position={position}
          color={type === 'stock' ? "#666666" : type === 'sales' ? "#888888" : "#777777"}
          type={type as UnitProps['type']}
          data={unitData[type as UnitProps['type']]}
          onClick={() => handleUnitClick(type as UnitProps['type'])}
        />
      ))}
      
      <DataLine 
        start={positions.stock} 
        end={positions.sales}
        active={selectedUnit === 'stock' || selectedUnit === 'sales'} 
      />
      <DataLine 
        start={positions.sales} 
        end={positions.service}
        active={selectedUnit === 'sales' || selectedUnit === 'service'} 
      />
      <DataLine 
        start={positions.service} 
        end={positions.stock}
        active={selectedUnit === 'service' || selectedUnit === 'stock'} 
      />
    </group>
  );
}