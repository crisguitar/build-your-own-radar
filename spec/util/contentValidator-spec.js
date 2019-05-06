const ContentValidator = require('../../src/util/contentValidator')
const MalformedDataError = require('../../src/exceptions/malformedDataError')
const ExceptionMessages = require('../../src/util/exceptionMessages')

describe('ContentValidator', function () {
  describe('verifyContent', function () {
    it('does not return anything if content is valid', function () {
      var columnNames = ['name', 'ring', 'quadrant', 'isNew', 'description', 'keyword']
      var contentValidator = new ContentValidator(columnNames)

      expect(contentValidator.verifyContent()).not.toBeDefined()
    })

    it('raises an error if content is empty', function () {
      var columnNames = []
      var contentValidator = new ContentValidator(columnNames)

      expect(function () {
        contentValidator.verifyContent()
      }).toThrow(new MalformedDataError(ExceptionMessages.MISSING_CONTENT))
    })
  })

  describe('verifyHeaders', function () {
    describe('raise error', function () {
      it('when name header is missing', function () {
        const columnNames = ['ring', 'quadrant', 'isNew', 'description', 'keyword']
        const contentValidator = new ContentValidator(columnNames)

        expect(function () {
          contentValidator.verifyHeaders()
        }).toThrow(new MalformedDataError(ExceptionMessages.MISSING_HEADERS))
      })

      it('when ring header is missing', function () {
        const columnNames = ['name', 'quadrant', 'isNew', 'description', 'keyword']
        const contentValidator = new ContentValidator(columnNames)

        expect(function () {
          contentValidator.verifyHeaders()
        }).toThrow(new MalformedDataError(ExceptionMessages.MISSING_HEADERS))
      })

      it('when quadrant header is missing', function () {
        const columnNames = ['name', 'ring', 'isNew', 'description', 'keyword']
        const contentValidator = new ContentValidator(columnNames)

        expect(function () {
          contentValidator.verifyHeaders()
        }).toThrow(new MalformedDataError(ExceptionMessages.MISSING_HEADERS))
      })

      it('when isNew header is missing', function () {
        const columnNames = ['name', 'ring', 'quadrant', 'description', 'keyword']
        const contentValidator = new ContentValidator(columnNames)

        expect(function () {
          contentValidator.verifyHeaders()
        }).toThrow(new MalformedDataError(ExceptionMessages.MISSING_HEADERS))
      })

      it('when isNew description is missing', function () {
        const columnNames = ['name', 'ring', 'quadrant', 'isNew', 'keyword']
        const contentValidator = new ContentValidator(columnNames)

        expect(function () {
          contentValidator.verifyHeaders()
        }).toThrow(new MalformedDataError(ExceptionMessages.MISSING_HEADERS))
      })

      it('when isNew keyword is missing', function () {
        const columnNames = ['name', 'ring', 'quadrant', 'isNew', 'description']
        const contentValidator = new ContentValidator(columnNames)

        expect(function () {
          contentValidator.verifyHeaders()
        }).toThrow(new MalformedDataError(ExceptionMessages.MISSING_HEADERS))
      })
    })

    it('does not return anything if the all required headers are present', function () {
      var columnNames = ['name', 'ring', 'quadrant', 'isNew', 'description', 'keyword']
      var contentValidator = new ContentValidator(columnNames)

      expect(contentValidator.verifyHeaders()).not.toBeDefined()
    })

    it('does not care about white spaces in the headers', function () {
      var columnNames = [' name', 'ring ', '   quadrant', 'isNew   ', '   description   ', ' keyword   ']
      var contentValidator = new ContentValidator(columnNames)

      expect(contentValidator.verifyHeaders()).not.toBeDefined()
    })
  })
})
