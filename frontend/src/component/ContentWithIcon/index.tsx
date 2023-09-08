/*
 * Copyright (c) 2023 OceanBase
 * OCP Express is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import { Badge, Tooltip } from '@oceanbase/design';
import React, { isValidElement } from 'react';
import classNames from 'classnames';
import Icon from '@ant-design/icons';
import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import type { BadgeProps } from 'antd/es/badge';
import type { TooltipProps } from 'antd/es/tooltip';
import useStyles from './index.style';

interface IconConfig extends IconComponentProps {
  badge?: BadgeProps;
  tooltip?: TooltipProps;
  pointable?: boolean;
}

type IconPosition = 'prefix' | 'affix';

export interface ContentWithIconProps {
  content?: React.ReactNode;
  prefixIcon?: IconConfig | React.ReactNode;
  affixIcon?: IconConfig | React.ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
  style?: React.CSSProperties;
  className?: string;
}

const ContentWithIcon: React.FC<ContentWithIconProps> = ({
  content,
  prefixIcon,
  affixIcon,
  className,
  ...restProps
}) => {
  const { styles } = useStyles();
  return (
    <span className={`${styles.item} ${className}`} {...restProps}>
      {prefixIcon &&
        (isValidElement(prefixIcon) ? (
          <span className={styles.prefix}>{prefixIcon}</span>
        ) : (
          getIcon('prefix', prefixIcon)
        ))}

      <span className={styles.content}>{content}</span>
      {affixIcon &&
        (isValidElement(affixIcon) ? (
          <span className={styles.affix}>{affixIcon}</span>
        ) : (
          getIcon('affix', affixIcon)
        ))}
    </span>
  );
};

function getIcon(position: IconPosition, config: IconConfig) {
  const { component, badge, tooltip, pointable = false, ...restProps } = config;
  const { styles } = useStyles();
  return (
    config && (
      <Tooltip {...tooltip} overlayStyle={{ maxWidth: 350, ...tooltip?.overlayStyle }}>
        {badge ? (
          <Badge
            {...badge}
            className={classNames(`${styles[position]}`, {
              [styles.pointable]: tooltip || pointable,
            })}
          >
            <Icon component={component} {...restProps} />
          </Badge>
        ) : (
          <span
            className={classNames(`${styles[position]}`, {
              [styles.pointable]: tooltip || pointable,
            })}
          >
            <Icon component={component} {...restProps} />
          </span>
        )}
      </Tooltip>
    )
  );
}

export default ContentWithIcon;
