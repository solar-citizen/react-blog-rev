import styles from './Tab.module.css';
import React, { useState, useEffect } from 'react';
import { Button } from '../index';

const Tab = ({ children, active }) => {
  const [activeTab, setActiveTab] = useState(active);
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    let data = [];

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;

      const {
        props: { tab, children },
      } = element;

      data.push({ tab, children });
    });

    setTabsData(data);
  }, [children]);

  return (
    <div className={styles.Tab}>
      <ul>
        {tabsData.map(({ tab }, i) => (
          <li key={i}>
            <Button
              active={i === activeTab ? true : false}
              type='primary'
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </Button>
          </li>
        ))}
      </ul>

      <div>{tabsData[activeTab]?.children}</div>
    </div>
  );
};

const TabPane = ({ children }) => {
  return { children };
};

Tab.TabPane = TabPane;

export default Tab;
