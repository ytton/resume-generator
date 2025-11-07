import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 模板CSS文件路径
const templatesDir = path.join(__dirname, '../src/pages/resume/components/resumeContent/templates')
const outputFile = path.join(__dirname, '../src/utils/templateCSS.ts')

// 模板类型映射
const templateMap = {
  'default': 'default.less',
  'modern-clean': 'modern-clean.less',
  'classic-business': 'classic-business.less',
  'creative-design': 'creative-design.less',
  'tech-professional': 'tech-professional.less'
}

/**
 * 读取CSS文件并转换为适用于自定义样式的格式
 */
function convertCSSForCustom(cssContent, templateClass) {
  // 将原模板类名替换为自定义模板类名
  const customCSSContent = cssContent
    .replace(new RegExp(`\\.${templateClass}`, 'g'), '.template-custom')
    .replace(/\/\*[\s\S]*?\*\//g, '') // 移除注释
    .replace(/\n\s*\n/g, '\n') // 移除多余空行
    .trim()
  
  return `/* 基于${templateClass}模板的自定义样式 */\n${customCSSContent}\n\n/* 在此基础上添加你的自定义样式 */`
}

/**
 * 生成getTemplateBaseCSS函数代码
 */
function generateGetTemplateBaseCSSFunction() {
  const templateCases = []
  
  Object.entries(templateMap).forEach(([templateType, fileName]) => {
    const filePath = path.join(templatesDir, fileName)
    
    if (fs.existsSync(filePath)) {
      const cssContent = fs.readFileSync(filePath, 'utf-8')
      const templateClass = `template-${templateType}`
      const customCSS = convertCSSForCustom(cssContent, templateClass)
      
      // 转义CSS内容中的反引号和反斜杠
      const escapedCSS = customCSS
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${')
      
      templateCases.push(`    case '${templateType}':
      return \`${escapedCSS}\``)
    } else {
      console.warn(`模板文件不存在: ${filePath}`)
      templateCases.push(`    case '${templateType}':
      return defaultCustomCSS`)
    }
  })
  
  return `import { TemplateType } from '@/store/template'

// 默认自定义CSS模板
const defaultCustomCSS = \`/* 自定义简历样式 */
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
}\`

/**
 * 获取模板基础CSS样式
 * 此函数由脚本自动生成，请勿手动修改
 */
export const getTemplateBaseCSS = (templateType: TemplateType): string => {
  switch (templateType) {
${templateCases.join('\n')}
    case 'custom':
      return defaultCustomCSS
    default:
      return defaultCustomCSS
  }
}
`
}

/**
 * 主函数
 */
function main() {
  try {
    console.log('开始生成模板CSS函数...')
    
    // 确保输出目录存在
    const outputDir = path.dirname(outputFile)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // 生成函数代码
    const functionCode = generateGetTemplateBaseCSSFunction()
    
    // 写入文件
    fs.writeFileSync(outputFile, functionCode, 'utf-8')
    
    console.log(`✅ 成功生成模板CSS函数: ${outputFile}`)
    console.log('📝 包含的模板:', Object.keys(templateMap).join(', '))
    
  } catch (error) {
    console.error('❌ 生成模板CSS函数失败:', error)
    process.exit(1)
  }
}

// 运行主函数
main()