import { TemplateType } from '@/store/template'

// 默认自定义CSS模板
const defaultCustomCSS = `/* 自定义简历样式 */
.template-custom {
  .pages {
    background-color: #ffffff;
    line-height: var(--line-height, 1.6);
    
    .page + .page {
      margin-top: 20px;
    }
  }

  .module {
    margin-bottom: 24px;
    border-radius: 8px;
    border: 1px solid #e8e8e8;
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    &__title {
      line-height: 1.4;
      padding: 12px 16px;
      background: var(--color-primary, #1890ff);
      border-radius: 8px 8px 0 0;

      span {
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        padding: 0;
      }
    }

    &__content {
      padding: 16px;
    }
  }

  /* 在这里添加你的自定义样式 */
}`

/**
 * 获取模板基础CSS样式
 * 此函数由脚本自动生成，请勿手动修改
 */
export const getTemplateBaseCSS = (templateType: TemplateType): string => {
  switch (templateType) {
    case 'default':
      return `/* 基于template-default模板的自定义样式 */
.template-custom {
  .module {
    &__title {
      line-height: 1.5;
      span {
        background-color: var(--color-primary, #6767aa);
        padding: 3px;
        padding-left: 5px;
        min-width: 6em;
        display: inline-block;
        color: #fff;
      }
      border-bottom: 2px solid var(--color-primary, #6767aa);
    }
    &__content {
      padding: 8px 3px;
    }
  }
  .hide-label.hide-label {
    .base-info {
      min-height: 180px;
      .desc-item {
        width: auto;
        &::after {
          content: '|';
          display: inline-block;
          padding: 0 0.5em;
          color: #cccccc;
        }
      }
      .label {
        display: none;
      }
      &__name {
        order: 1;
        font-size: 28px;
        &.desc-item {
          width: 100%;
          &::after {
            content: '';
          }
        }
      }
      &__gender {
        order: 2;
      }
      &__age {
        order: 3;
      }
      &__work-years {
        order: 4;
      }
      &__tel {
        order: 5;
      }
      &__email {
        order: 6;
      }
      &__salary {
        &.desc-item::after {
          content: '';
        }
      }
      &__cur-status {
        width: 100% !important;
        order: 99999;
        margin-top: 0.5em;
        &.desc-item::after {
          content: '';
        }
      }
    }
  }
  .base-info {
    position: relative;
    .desc-item {
      padding: 5px 0;
      width: 50%;
      order: 999;
    }
    .module__content {
      display: flex;
      flex-wrap: wrap;
      padding-right: 100px;
    }
    .label {
      display: inline-block;
      width: 7em;
      &::after {
        content: ':';
        margin-right: 10px;
      }
    }
    &__name {
      order: 1;
    }
    &__avatar {
      position: absolute;
      right: 0px;
      order: 3;
    }
    &__tel {
      order: 3;
    }
    &__email {
      order: 4;
    }
    &__gender {
      order: 5;
    }
    &__work-years {
      order: 6;
    }
    &__intention {
      order: 2;
    }
    & &__edu-level {
      order: 7;
    }
    & &__city {
      order: 8;
    }
  }
  .skills {
    .desc-item {
      padding: 4px 0;
      font-size: 14px;
      &::before {
        content: '▣';
        margin-right: 14px;
      }
    }
  }
  .work-experiences,
  .project-list,
  .edu-info {
    .header {
      .title {
        order: 1;
        flex: 1;
        font-weight: bold;
      }
      .date-range {
        flex: 1;
        order: 2;
        text-align: center;
      }
      .sub-title {
        flex: 1;
        order: 3;
        padding-right: 10px;
        text-align: right;
      }
    }
    .desc {
      margin-top: 8px;
    }
    .common-module+.common-module {
      margin-top: 10px;
    }
  }
}

/* 在此基础上添加你的自定义样式 */`
    case 'modern-clean':
      return `/* 基于template-modern-clean模板的自定义样式 */
.template-custom {
  .pages {
    background-color: #f8f9fa;
    line-height: var(--line-height, 1.6);
    .page + .page {
      margin-top: 24px;
    }
  }
  .module {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    &__title {
      line-height: 1.4;
      padding: 16px 24px 12px;
      border-bottom: none;
      margin-bottom: 0;
      span {
        background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, #764ba2 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.5px;
        padding: 0;
        min-width: auto;
        display: inline-block;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--color-primary, #667eea), transparent);
          border-radius: 2px;
        }
      }
    }
    &__content {
      padding: 20px 24px 24px;
    }
  }
  // 基础信息模块
  .base-info {
    position: relative;
    .desc-item {
      padding: 8px 0;
      width: 50%;
      order: 999;
      font-size: 15px;
      line-height: 1.5;
    }
    .module__content {
      display: flex;
      flex-wrap: wrap;
      padding-right: 120px;
    }
    .label {
      display: inline-block;
      width: 7em;
      font-weight: 500;
      color: #666;
      &::after {
        content: ':';
        margin-right: 12px;
      }
    }
    &__name {
      order: 1;
      font-size: 32px !important;
      font-weight: 700;
      color: #1a1a1a;
      width: 100% !important;
      margin-bottom: 8px;
    }
    &__avatar {
      position: absolute;
      right: 0px;
      top: 0;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    &__tel, &__email {
      order: 2;
      color: #444;
    }
    &__gender, &__work-years {
      order: 5;
    }
    &__intention {
      order: 3;
      width: 100% !important;
      font-size: 16px;
      color: var(--color-primary, #667eea);
      font-weight: 500;
    }
    &__city {
      order: 6;
    }
  }
  // 隐藏标签样式
  .hide-label.hide-label {
    .base-info {
      min-height: 200px;
      .desc-item {
        width: auto;
        margin-right: 24px;
        padding: 6px 16px;
        background: rgba(var(--color-primary, 102, 126, 234), 0.08);
        border-radius: 20px;
        font-size: 14px;
        &::after {
          display: none;
        }
      }
      .label {
        display: none;
      }
      &__name {
        order: 1;
        font-size: 36px !important;
        margin-bottom: 16px;
        &.desc-item {
          width: 100% !important;
          background: none;
          padding: 0;
          margin-right: 0;
        }
      }
      &__cur-status {
        width: 100% !important;
        order: 99999;
        margin-top: 12px;
        background: none !important;
        padding: 0 !important;
        font-style: italic;
        color: #666;
      }
    }
  }
  // 技能模块
  .skills {
    .desc-item {
      padding: 8px 0;
      font-size: 15px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        width: 6px;
        height: 6px;
        background: var(--color-primary, #667eea);
        border-radius: 50%;
        margin-right: 16px;
        flex-shrink: 0;
      }
    }
  }
  // 工作经验、项目经验、教育信息
  .work-experiences,
  .project-list,
  .edu-info {
    .header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #eee;
      .title {
        order: 1;
        flex: 2;
        font-weight: 600;
        font-size: 16px;
        color: #1a1a1a;
      }
      .date-range {
        order: 3;
        flex: 1;
        text-align: right;
        font-size: 14px;
        color: var(--color-primary, #667eea);
        font-weight: 500;
      }
      .sub-title {
        order: 2;
        flex: 1.5;
        text-align: center;
        padding: 0 20px;
        font-size: 15px;
        color: #666;
      }
    }
    .desc {
      margin-top: 12px;
      line-height: 1.7;
      color: #444;
      ul {
        padding-left: 20px;
        li {
          margin-bottom: 6px;
          position: relative;
          &::marker {
            color: var(--color-primary, #667eea);
          }
        }
      }
    }
    .common-module + .common-module {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #f0f0f0;
    }
  }
  // 自我评价模块
  .self-evaluation {
    .module__content {
      font-size: 15px;
      line-height: 1.8;
      color: #444;
      font-style: italic;
    }
  }
}

/* 在此基础上添加你的自定义样式 */`
    case 'classic-business':
      return `/* 基于template-classic-business模板的自定义样式 */
.template-custom {
  .pages {
    background-color: #ffffff;
    line-height: var(--line-height, 1.5);
    .page + .page {
      margin-top: 20px;
    }
  }
  .module {
    border-bottom: 2px solid #e8e8e8;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
    &__title {
      line-height: 1.4;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 3px solid var(--color-primary, #2c3e50);
      span {
        background-color: var(--color-primary, #2c3e50);
        color: #fff;
        padding: 8px 16px;
        font-size: 16px;
        font-weight: 600;
        min-width: 8em;
        display: inline-block;
        text-transform: uppercase;
        letter-spacing: 1px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 0;
          height: 0;
          border-left: 10px solid var(--color-primary, #2c3e50);
          border-bottom: 10px solid transparent;
        }
      }
    }
    &__content {
      padding: 16px 8px 20px;
    }
  }
  // 基础信息模块
  .base-info {
    position: relative;
    .desc-item {
      padding: 6px 0;
      width: 50%;
      order: 999;
      font-size: 14px;
      line-height: 1.6;
    }
    .module__content {
      display: flex;
      flex-wrap: wrap;
      padding-right: 110px;
    }
    .label {
      display: inline-block;
      width: 8em;
      font-weight: 600;
      color: var(--color-primary, #2c3e50);
      &::after {
        content: ':';
        margin-right: 8px;
      }
    }
    &__name {
      order: 1;
      font-size: 28px !important;
      font-weight: 700;
      color: var(--color-primary, #2c3e50);
      width: 100% !important;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    &__avatar {
      position: absolute;
      right: 0px;
      top: 0;
      border: 4px solid var(--color-primary, #2c3e50);
      background: #fff;
      padding: 4px;
    }
    &__tel, &__email {
      order: 2;
      color: #333;
    }
    &__gender, &__work-years {
      order: 4;
    }
    &__intention {
      order: 3;
      width: 100% !important;
      font-size: 16px;
      font-weight: 600;
      color: #444;
      margin: 8px 0;
      padding: 8px 0;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    &__city {
      order: 5;
    }
  }
  // 隐藏标签样式
  .hide-label.hide-label {
    .base-info {
      min-height: 180px;
      .desc-item {
        width: auto;
        margin-right: 20px;
        &::after {
          content: '|';
          display: inline-block;
          padding: 0 0.8em;
          color: var(--color-primary, #2c3e50);
          font-weight: bold;
        }
      }
      .label {
        display: none;
      }
      &__name {
        order: 1;
        font-size: 30px !important;
        &.desc-item {
          width: 100% !important;
          margin-bottom: 16px;
          &::after {
            display: none;
          }
        }
      }
      &__salary {
        &.desc-item::after {
          display: none;
        }
      }
      &__cur-status {
        width: 100% !important;
        order: 99999;
        margin-top: 12px;
        font-style: italic;
        color: #666;
        &.desc-item::after {
          display: none;
        }
      }
    }
  }
  // 技能模块
  .skills {
    .desc-item {
      padding: 6px 0;
      font-size: 14px;
      &::before {
        content: '●';
        margin-right: 12px;
        color: var(--color-primary, #2c3e50);
        font-weight: bold;
      }
    }
  }
  // 工作经验、项目经验、教育信息
  .work-experiences,
  .project-list,
  .edu-info {
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ddd;
      .title {
        order: 1;
        flex: 2;
        font-weight: 700;
        font-size: 16px;
        color: var(--color-primary, #2c3e50);
        text-transform: uppercase;
      }
      .date-range {
        order: 3;
        flex: 1;
        text-align: right;
        font-size: 13px;
        color: #666;
        font-weight: 600;
        background: #f8f8f8;
        padding: 4px 8px;
        border-radius: 4px;
      }
      .sub-title {
        order: 2;
        flex: 1.5;
        text-align: center;
        padding: 0 16px;
        font-size: 14px;
        color: #555;
        font-style: italic;
      }
    }
    .desc {
      margin-top: 12px;
      line-height: 1.6;
      color: #333;
      ul {
        padding-left: 24px;
        li {
          margin-bottom: 6px;
          &::marker {
            color: var(--color-primary, #2c3e50);
            content: '▶ ';
          }
        }
      }
    }
    .common-module + .common-module {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #f0f0f0;
    }
  }
  // 自我评价模块
  .self-evaluation {
    .module__content {
      font-size: 14px;
      line-height: 1.7;
      color: #333;
      text-align: justify;
      padding: 16px;
      background: #f9f9f9;
      border-left: 4px solid var(--color-primary, #2c3e50);
    }
  }
}

/* 在此基础上添加你的自定义样式 */`
    case 'creative-design':
      return `/* 基于template-creative-design模板的自定义样式 */
.template-custom {
  .pages {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    line-height: var(--line-height, 1.6);
    padding: 20px;
    .page + .page {
      margin-top: 20px;
    }
  }
  .module {
    position: relative;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    &:nth-child(odd) {
      transform: rotate(-0.5deg);
    }
    &:nth-child(even) {
      transform: rotate(0.3deg);
    }
    &:hover {
      transform: rotate(0deg) scale(1.02);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
    }
    &__title {
      line-height: 1.2;
      margin: 0;
      position: relative;
      overflow: hidden;
      span {
        background: linear-gradient(45deg, var(--color-primary, #ff6b6b), #4ecdc4);
        color: #fff;
        padding: 16px 20px;
        font-size: 18px;
        font-weight: 700;
        display: block;
        text-transform: uppercase;
        letter-spacing: 2px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2s infinite;
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
          background-size: 300% 300%;
          animation: gradient 3s ease infinite;
        }
      }
    }
    &__content {
      padding: 24px 20px;
    }
  }
  // 基础信息模块
  .base-info {
    position: relative;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.9));
    .desc-item {
      padding: 8px 0;
      width: 50%;
      order: 999;
      font-size: 14px;
      line-height: 1.6;
    }
    .module__content {
      display: flex;
      flex-wrap: wrap;
      padding-right: 120px;
    }
    .label {
      display: inline-block;
      width: 7em;
      font-weight: 600;
      color: #555;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 1px;
      &::after {
        content: ':';
        margin-right: 10px;
        color: var(--color-primary, #ff6b6b);
      }
    }
    &__name {
      order: 1;
      font-size: 36px !important;
      font-weight: 800;
      background: linear-gradient(45deg, var(--color-primary, #ff6b6b), #4ecdc4);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      width: 100% !important;
      margin-bottom: 16px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }
    &__avatar {
      position: absolute;
      right: 0px;
      top: 10px;
      border-radius: 50%;
      border: 4px solid #fff;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      filter: grayscale(20%) contrast(1.1);
      transition: all 0.3s ease;
      &:hover {
        filter: grayscale(0%) contrast(1.2);
        transform: scale(1.05);
      }
    }
    &__tel, &__email {
      order: 2;
      color: #444;
    }
    &__gender, &__work-years {
      order: 4;
    }
    &__intention {
      order: 3;
      width: 100% !important;
      font-size: 16px;
      font-weight: 600;
      color: var(--color-primary, #ff6b6b);
      margin: 12px 0;
      padding: 12px;
      background: rgba(255, 107, 107, 0.1);
      border-radius: 8px;
      border-left: 4px solid var(--color-primary, #ff6b6b);
    }
    &__city {
      order: 5;
    }
  }
  // 隐藏标签样式
  .hide-label.hide-label {
    .base-info {
      min-height: 200px;
      .desc-item {
        width: auto;
        margin-right: 16px;
        margin-bottom: 8px;
        padding: 8px 16px;
        background: linear-gradient(45deg, var(--color-primary, #ff6b6b), #4ecdc4);
        color: #fff;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        &::after {
          display: none;
        }
      }
      .label {
        display: none;
      }
      &__name {
        order: 1;
        font-size: 40px !important;
        &.desc-item {
          width: 100% !important;
          background: none;
          color: transparent;
          padding: 0;
          margin-right: 0;
          margin-bottom: 20px;
        }
      }
      &__cur-status {
        width: 100% !important;
        order: 99999;
        margin-top: 16px;
        background: rgba(255, 255, 255, 0.8) !important;
        color: #666 !important;
        font-style: italic;
      }
    }
  }
  // 技能模块
  .skills {
    .desc-item {
      padding: 10px 0;
      font-size: 14px;
      position: relative;
      padding-left: 24px;
      &::before {
        content: '◆';
        position: absolute;
        left: 0;
        color: var(--color-primary, #ff6b6b);
        font-size: 16px;
        animation: pulse 2s infinite;
      }
    }
  }
  // 工作经验、项目经验、教育信息
  .work-experiences,
  .project-list,
  .edu-info {
    .header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 16px;
      padding: 16px;
      background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
      border-radius: 12px;
      border: 2px solid rgba(255, 107, 107, 0.2);
      .title {
        order: 1;
        flex: 2;
        font-weight: 700;
        font-size: 18px;
        color: var(--color-primary, #ff6b6b);
      }
      .date-range {
        order: 3;
        flex: 1;
        text-align: right;
        font-size: 13px;
        color: #fff;
        background: linear-gradient(45deg, #4ecdc4, #45b7d1);
        padding: 6px 12px;
        border-radius: 16px;
        font-weight: 600;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      .sub-title {
        order: 2;
        flex: 1.5;
        text-align: center;
        padding: 0 16px;
        font-size: 14px;
        color: #666;
        font-weight: 500;
      }
    }
    .desc {
      margin-top: 16px;
      line-height: 1.7;
      color: #444;
      ul {
        padding-left: 0;
        list-style: none;
        li {
          margin-bottom: 8px;
          padding-left: 24px;
          position: relative;
          &::before {
            content: '✦';
            position: absolute;
            left: 0;
            color: var(--color-primary, #ff6b6b);
            font-size: 14px;
          }
        }
      }
    }
    .common-module + .common-module {
      margin-top: 24px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--color-primary, #ff6b6b), transparent);
      }
    }
  }
  // 自我评价模块
  .self-evaluation {
    .module__content {
      font-size: 15px;
      line-height: 1.8;
      color: #444;
      text-align: center;
      font-style: italic;
      position: relative;
      &::before,
      &::after {
        content: '"';
        font-size: 48px;
        color: var(--color-primary, #ff6b6b);
        opacity: 0.3;
        font-family: serif;
      }
      &::before {
        position: absolute;
        top: -10px;
        left: -10px;
      }
      &::after {
        position: absolute;
        bottom: -20px;
        right: -10px;
      }
    }
  }
}
// 动画定义
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* 在此基础上添加你的自定义样式 */`
    case 'tech-professional':
      return `/* 基于template-tech-professional模板的自定义样式 */
.template-custom {
  .pages {
    background-color: #0a0e1a;
    color: #e2e8f0;
    line-height: var(--line-height, 1.6);
    font-family: 'Consolas', 'Monaco', 'Menlo', monospace;
    .page + .page {
      margin-top: 20px;
    }
  }
  .module {
    background: #1a202c;
    border: 1px solid #2d3748;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--color-primary, #00d4aa), #0099cc);
    }
    &:hover {
      border-color: var(--color-primary, #00d4aa);
      box-shadow: 0 4px 16px rgba(0, 212, 170, 0.2);
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }
    &__title {
      line-height: 1.4;
      margin: 0;
      padding: 0;
      border: none;
      span {
        background: #2d3748;
        color: var(--color-primary, #00d4aa);
        padding: 12px 16px;
        font-size: 14px;
        font-weight: 600;
        display: block;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-family: 'Consolas', monospace;
        position: relative;
        &::before {
          content: '// ';
          color: #718096;
          margin-right: 8px;
        }
        &::after {
          content: ' {';
          color: #718096;
        }
      }
    }
    &__content {
      padding: 20px 16px;
      position: relative;
      &::after {
        content: '}';
        position: absolute;
        bottom: 8px;
        right: 16px;
        color: #718096;
        font-family: 'Consolas', monospace;
      }
    }
  }
  // 基础信息模块
  .base-info {
    position: relative;
    .desc-item {
      padding: 4px 0;
      width: 50%;
      order: 999;
      font-size: 13px;
      line-height: 1.5;
      font-family: 'Consolas', monospace;
    }
    .module__content {
      display: flex;
      flex-wrap: wrap;
      padding-right: 110px;
    }
    .label {
      display: inline-block;
      width: 8em;
      font-weight: 500;
      color: #4fd1c7;
      &::after {
        content: ': ';
        margin-right: 8px;
        color: #718096;
      }
      &::before {
        content: '  ';
      }
    }
    &__name {
      order: 1;
      font-size: 32px !important;
      font-weight: 700;
      color: var(--color-primary, #00d4aa);
      width: 100% !important;
      margin-bottom: 16px;
      font-family: 'Consolas', monospace;
      position: relative;
      &::before {
        content: 'const developer = "';
        font-size: 14px;
        color: #718096;
        display: block;
        margin-bottom: 4px;
      }
      &::after {
        content: '";';
        font-size: 14px;
        color: #718096;
      }
    }
    &__avatar {
      position: absolute;
      right: 0px;
      top: 0;
      border: 2px solid var(--color-primary, #00d4aa);
      border-radius: 4px;
      filter: grayscale(100%) contrast(1.2);
      transition: all 0.3s ease;
      &:hover {
        filter: grayscale(0%) contrast(1);
        box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);
      }
    }
    &__tel, &__email {
      order: 2;
      color: #a0aec0;
    }
    &__gender, &__work-years {
      order: 4;
    }
    &__intention {
      order: 3;
      width: 100% !important;
      font-size: 14px;
      font-weight: 500;
      color: #fbb6ce;
      margin: 12px 0;
      padding: 8px 12px;
      background: rgba(251, 182, 206, 0.1);
      border-left: 3px solid #fbb6ce;
      border-radius: 4px;
      font-family: 'Consolas', monospace;
      &::before {
        content: '// Role: ';
        color: #718096;
      }
    }
    &__city {
      order: 5;
    }
  }
  // 隐藏标签样式
  .hide-label.hide-label {
    .base-info {
      min-height: 180px;
      .desc-item {
        width: auto;
        margin-right: 20px;
        padding: 4px 8px;
        background: #2d3748;
        border: 1px solid #4a5568;
        border-radius: 4px;
        font-size: 12px;
        font-family: 'Consolas', monospace;
        color: #e2e8f0;
        &::before {
          content: '"';
          color: #f56565;
        }
        &::after {
          content: '"';
          color: #f56565;
        }
      }
      .label {
        display: none;
      }
      &__name {
        order: 1;
        font-size: 36px !important;
        &.desc-item {
          width: 100% !important;
          background: none;
          border: none;
          padding: 0;
          margin-right: 0;
          margin-bottom: 20px;
          &::before,
          &::after {
            color: #718096 !important;
          }
        }
      }
      &__cur-status {
        width: 100% !important;
        order: 99999;
        margin-top: 12px;
        background: none !important;
        border: none !important;
        color: #718096 !important;
        font-style: italic;
        &::before,
        &::after {
          content: '';
        }
      }
    }
  }
  // 技能模块
  .skills {
    .desc-item {
      padding: 6px 0;
      font-size: 13px;
      font-family: 'Consolas', monospace;
      position: relative;
      padding-left: 20px;
      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: var(--color-primary, #00d4aa);
        font-weight: bold;
      }
      &::after {
        content: ',';
        color: #718096;
      }
      &:last-child::after {
        display: none;
      }
    }
  }
  // 工作经验、项目经验、教育信息
  .work-experiences,
  .project-list,
  .edu-info {
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      padding: 12px;
      background: #2d3748;
      border: 1px solid #4a5568;
      border-radius: 6px;
      font-family: 'Consolas', monospace;
      .title {
        order: 1;
        flex: 2;
        font-weight: 600;
        font-size: 16px;
        color: var(--color-primary, #00d4aa);
        &::before {
          content: 'company: "';
          font-size: 12px;
          color: #4fd1c7;
        }
        &::after {
          content: '",';
          font-size: 12px;
          color: #718096;
        }
      }
      .date-range {
        order: 3;
        flex: 1;
        text-align: right;
        font-size: 11px;
        color: #fbb6ce;
        background: rgba(251, 182, 206, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid rgba(251, 182, 206, 0.3);
        &::before {
          content: 'period: ';
          color: #718096;
        }
      }
      .sub-title {
        order: 2;
        flex: 1.5;
        text-align: center;
        padding: 0 16px;
        font-size: 13px;
        color: #4fd1c7;
        &::before {
          content: 'role: "';
          font-size: 11px;
          color: #718096;
        }
        &::after {
          content: '"';
          font-size: 11px;
          color: #718096;
        }
      }
    }
    .desc {
      margin-top: 16px;
      line-height: 1.6;
      color: #a0aec0;
      font-size: 13px;
      ul {
        padding-left: 0;
        list-style: none;
        li {
          margin-bottom: 6px;
          padding-left: 20px;
          position: relative;
          &::before {
            content: '- ';
            position: absolute;
            left: 0;
            color: var(--color-primary, #00d4aa);
            font-family: 'Consolas', monospace;
          }
        }
      }
      code {
        background: #2d3748;
        color: #f7fafc;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 12px;
        border: 1px solid #4a5568;
      }
    }
    .common-module + .common-module {
      margin-top: 24px;
      position: relative;
      &::before {
        content: '// ---';
        position: absolute;
        top: -16px;
        left: 0;
        color: #718096;
        font-size: 12px;
        font-family: 'Consolas', monospace;
      }
    }
  }
  // 自我评价模块
  .self-evaluation {
    .module__content {
      font-size: 13px;
      line-height: 1.7;
      color: #a0aec0;
      font-family: 'Consolas', monospace;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        bottom: -8px;
        right: -4px;
        color: #718096;
        font-size: 14px;
      }
    }
  }
  // 特殊代码块样式
  .code-block {
    background: #1a202c;
    border: 1px solid #2d3748;
    border-radius: 6px;
    padding: 12px;
    margin: 8px 0;
    font-family: 'Consolas', monospace;
    font-size: 12px;
    color: #e2e8f0;
    &::before {
      content: '\`\`\`';
      color: #718096;
      display: block;
      margin-bottom: 8px;
    }
    &::after {
      content: '\`\`\`';
      color: #718096;
      display: block;
      margin-top: 8px;
    }
  }
}

/* 在此基础上添加你的自定义样式 */`
    case 'custom':
      return defaultCustomCSS
    default:
      return defaultCustomCSS
  }
}
